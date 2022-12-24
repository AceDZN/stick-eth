import { useCallback, useState } from "react";
import { useAppState } from "../../hooks/useAppStateContext";
import { useStickers } from "../../hooks/useStickersContext";
import { colorShade } from "../../utils/utils";
import { ContextMenu } from "../ContextMenu";
import { EllipseSticker } from "./ellipse";
import { ImageSticker } from "./image";
import { RectSticker } from "./rectangle";
import { StarSticker } from "./star";
export const StickerEl = (props:any)=>{
    const [state, {selectSticker, openContextMenu, closeContextMenu}] = useAppState();
    const {sticker} = props;
    const { id } = sticker;
    const [stickersState, {setStickers, updateSticker, stopDraggingSticker, startDraggingSticker}] = useStickers();

    const handleStickerChange = useCallback((newAttrs:any)=>{
        console.log("handleStickerChange")
        updateSticker(id, newAttrs)
        return null
    },[sticker, setStickers])

        
    const handleDragStart = useCallback(() => {
        console.log("handleDragStart", id)
        closeContextMenu();
        startDraggingSticker(id)
        return null
    },[sticker, startDraggingSticker]);

    const handleDragEnd = useCallback((e:any) => {
        console.log("handleDragEnd",e)

        stopDraggingSticker();
        if(e?.target?.attrs){
            const updatedSticker = {...sticker, x: e.target.attrs.x, y: e.target.attrs.y, rotation: e.target.attrs.rotation};
            console.log(sticker.id, updatedSticker);
            //updateSticker(sticker.id, updatedSticker)
        }
        
        return null
    },[sticker, stopDraggingSticker]);

    const handleStickerSelect = useCallback(() => {
        console.log("handleStickerSelect")
        closeContextMenu();
        selectSticker(id)
        return null
    },[sticker, selectSticker]);

    const handleContextMenu = useCallback((e:any) => {
        e.evt.preventDefault();
        
        console.log("handleContextMenu",e)
        openContextMenu({position: {x: e.evt.offsetX, y: e.evt.offsetY}, id: sticker.id})
        return null
    },[sticker, selectSticker]);

    return (<>
        {
            sticker.type==="image" ? (
                <ImageSticker
                    {...props}
                    onDrag={handleDragStart}
                    onDrop={handleDragEnd}
                    onSelect={handleStickerSelect }
                    onChange={(newAttrs:any) => { handleStickerChange(newAttrs) }}
                    onContextMenu={handleContextMenu} />
            ) : (
                <Shape 
                    {...props}
                    onDrag={handleDragStart}
                    onDrop={handleDragEnd}
                    onSelect={handleStickerSelect }
                    onChange={(newAttrs:any) => { handleStickerChange(newAttrs) }}
                    onContextMenu={handleContextMenu}
                    />
            )
        }
    </>)

}
export const Shape = (props:any)=>{
    const { sticker,isSelected } = props;
    //console.log(props,"PROPS");
    // const {onDragStart,onClick, onTap, } = props;
    const { id, x, y, draggable, rotation, width, height, shape} = sticker;
    const { shadowOffsetX, shadowOffsetY, scaleX, scaleY, centeredScaling, fill } = shape.style;
    const handleDragEnd = ({x, y}: {x:number, y:number})=>{
        props.onChange({...sticker, x, y})
        props.onDrop();
    }
    const handleTransformEnd = (node:any,scaleX:number,scaleY:number)=>{
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end


        props.onChange({
        ...sticker,
        x: node.x(),
        y: node.y(),
        // set minimal value
        width: Math.max(5, node.width() * scaleX),
        height: Math.max(node.height() * scaleY),
        shape:{
            ...sticker.shape, 
            style: {
            ...sticker.shape.style,
            scaleX: 1,
            scaleY: 1,
            skewX:node.skewX(),
            skewY:node.skewY()
            }
        }
        });
    }
    const shapeProps = {
        id, x,y,draggable,rotation,width,height, centeredScaling,
        isSelected: props.isSelected,
        shadowOffsetX:sticker.isDragging ? shadowOffsetX*2 : shadowOffsetX,
        shadowOffsetY:sticker.isDragging ? shadowOffsetY*2 : shadowOffsetY,
        scaleX:sticker.isDragging ? scaleX+.05 : scaleX,
        scaleY:sticker.isDragging ? scaleY+.05 : scaleY,
        style: sticker.shape.style,
        fill: sticker.isDragging ? colorShade(fill, 10) : fill,
        onDragEnd: handleDragEnd,
        onTransformEnd: handleTransformEnd,
        onTap: props.onSelect,
        onClick: props.onSelect,
        onChange: props.onChange,
        onContextMenu: props.onContextMenu,
        onDragStart: props.onDrag
    };

    switch(sticker.shape.type){
        case 'star':
            return <StarSticker {...shapeProps} />
        case 'circle':
            return <EllipseSticker {...shapeProps} />
        case 'rect':
        default:
            return <RectSticker {...shapeProps} />
    }
}

