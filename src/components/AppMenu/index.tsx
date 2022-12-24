import { useAppState } from "../../hooks/useAppStateContext";
import { useStickers } from "../../hooks/useStickersContext";
import { getRandomColor, getRandomImage, getRandomInt, getShapeDefaults, getStickerDefaults } from "../../utils/utils";
import { Icon } from "../Icon";
import { UploadFileButton } from "./UploadFileButton";

type ShapeButtonsProps = {onClick: (s:any)=>void, direction?:string}

export const ShapeButtons = ({onClick, direction="vertical"} : ShapeButtonsProps) => {
    const menu = [
        {label: 'Add Star', icon: 'star', onClick: ()=>onClick('star') },
        {label: 'Add Rect', icon: 'square', onClick: ()=>onClick('rect') },
        {label: 'Add Circle', icon: 'circle', onClick: ()=>onClick('circle') }
    ]
    const directionButtonClassName = direction === 'horizontal' ? `first:rounded-l-lg last:rounded-r-lg` : `first:rounded-t-lg last:rounded-b-lg`;
    const directionClassName = direction === 'horizontal' ? 'flex-row' : 'flex-column';
    
    return (
        <div className={`flex ${directionClassName}`}>
        {menu.map((menuItem:any)=>(
            menuItem.isFile ? (
                <UploadFileButton key={`${menuItem.label}_${menuItem.icon}`} onUpload={menuItem.onChange} />
            ) : (    
            <button key={`${menuItem.label}_${menuItem.icon}`} onClick={menuItem.onClick} className={`box-border w-10 h-10 p-0 bg-blue-500 disabled:bg-blue-200 text-white hover:bg-blue-400 flex items-center justify-center mx-0 outline-none focus:shadow-outline ${directionButtonClassName}`}>
                {menuItem.icon ? (
                    <Icon className=" fill-slate-800 dark:fill-white w-6 h-6 " icon={menuItem.icon} />
                ) : (
                    <div className="text-slate-800 dark:text-white">{menuItem.label}</div>
                )}
            </button>
            )
        ))}
        </div>
    )
}

export const AppMenu = (props: { width?: number, height?: number }) => {
    const {width=100, height=100} = props;
    const [AppContext, {unselectSticker, setBackground} ] = useAppState();
    const [stickersState, {addSticker, removeSticker, shuffleStickers, updateSticker}] = useStickers();
    const {selectedSticker, background} = AppContext;
    const {stickers} = stickersState;
    const add = (type:string, initialData?: any) => {
        console.log("addSticker")
        let sticker = getStickerDefaults({
            key: `${stickersState.stickers.length}_${Math.random()}`,
            id: `${stickersState.stickers.length}`,
            type,
            ...initialData
        }, {canvasHeight:height, canvasWidth: width})

        switch(type){
            case 'star':
            case 'rect':
            case 'circle':
                sticker = {...sticker, type: 'shape', shape: {
                    type, 
                    style:{
                        ...getShapeDefaults(type)
                    }
                }}
                break;
            case 'image':
                sticker = {
                    ...sticker,
                    type: 'image',
                    src: initialData.src,
                    shape:{
                        type: 'image',
                        style:{
                            ...getShapeDefaults('image')
                        }
                    }
                }
                break;
            default:
                sticker = {...sticker, type: 'shape', shape: {
                    type:'star',
                    style:{
                        ...getShapeDefaults('star')
                    }
                }}
                break;
        }
        addSticker(sticker)
    }
    const remove = ()=>{
        if(!AppContext.selectedSticker){ return }
        removeSticker(AppContext.selectedSticker)
        unselectSticker()
    }
    

    const setBg = (s:any)=>{
        console.log("setBg", s)
        setBackground(s);
    }
    const menuItems = [
        {label: "Add Star Sticker", }
    ];

    const menu = [
        //{label: 'Add Icon', icon: 'plus', onClick: ()=>add('star') },
        {label: 'Remove Icon', icon: 'minus', disabled:'selectedSticker', onClick: ()=>AppContext.selectedSticker ? removeSticker(AppContext.selectedSticker) : null },
        {label: 'Shuffle Stickers', icon: 'exchange', onClick: shuffleStickers },
        {label: 'Upload Sticker', icon: 'upload', onChange: (uploaded_image:any)=>{
            console.log("ONCHANGE UPLOAD", uploaded_image);
            add('image', {...uploaded_image, rotation: 0})
        }, isFile: true },
        {label: 'Gradient Background', icon: 'portal-enter', onClick:(s:any)=>{setBg({...background, type:'gradient', gradient:{colorStart: getRandomColor(), colorEnd: getRandomColor(), angle:getRandomInt(0,180)}, fill: getRandomColor()})}},
        {label: 'Color Background', icon: 'portal-exit', onClick:(s:any)=>{setBg({...background, type:'color', fill: getRandomColor()})}},
        {label: 'Image Background', icon: 'cow', onClick:(s:any)=>{setBg({...background, type:'image', image: getRandomImage()})}}
    ]

    const handleUpdateColor = (c:any)=>{
        updateSticker()
    }
    //setBackground
    return (
       <div>
            <div className="flex justify-center rounded-lg text-lg mb-4 flex flex-col">
                <ShapeButtons onClick={(s)=>{add(s)}} direction="horizontal"/>
                {menu.map((menuItem)=>(
                    menuItem.isFile ? (
                        <UploadFileButton key={`${menuItem.label}_${menuItem.icon}`} onUpload={menuItem.onChange} />
                    ) : (    
                    <button disabled={menuItem.disabled ? !AppContext[menuItem.disabled] : false} key={`${menuItem.label}_${menuItem.icon}`} onClick={menuItem.onClick} className="box-border w-10 h-10 p-0 bg-blue-500 disabled:bg-blue-200 text-white hover:bg-blue-400 first:rounded-t-lg last:rounded-b-lg flex items-center justify-center mx-0 outline-none focus:shadow-outline">
                        {menuItem.icon ? (
                            <Icon className=" fill-slate-800 dark:fill-white w-6 h-6 " icon={menuItem.icon} />
                        ) : (
                            <div className="text-slate-800 dark:text-white">{menuItem.label}</div>
                        )}
                    </button>
                    )
                ))}
            </div>
            <div>
                
            </div>



            <br /><br />





            <div>
                Background: {JSON.stringify(background)}
            </div>
            <div>
                selectedSticker: {selectedSticker}
            </div>
            <div>
                Stickers Size: {stickers.length}
            </div>
            <div>
                Stickers : [ {stickers.map( (s:any) =><span key={s.id+'sss'}>{s.id+', '}</span>)} ]
            </div>
            <button onClick={()=>add('star')}>Add Sticker</button>
            <button onClick={remove}>Remove Sticker</button>
            <button onClick={shuffleStickers}>Shuffle Stickers</button>
            <div>
                DRAGGING?
                {stickers.map( (s:any) =><div key={s.id+'_drag_listener'}>{s.id+' - '+s.isDragging}</div>)}

            </div>


            <div>
                Stickers : [ {stickers.map( (s:any) =><div key={s.id+'mmmm'}>{JSON.stringify({id:s.id, x:s.x,y:s.y})+', '}</div>)} ]
            </div>
       </div>
    )
}