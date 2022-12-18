import { useCallback } from "react";
import { useAppState } from "../../hooks/useAppStateContext";
import { useStickers } from "../../hooks/useStickersContext";
import { EllipseSticker } from "./ellipse";
import { ImageSticker } from "./image";
import { RectSticker } from "./rectangle";
import { StarSticker } from "./star";
export const StickerEl = (props:any)=>{
    const [state, {selectSticker}] = useAppState();
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
        selectSticker(id)
        return null
    },[sticker, selectSticker]);

    const handleContextMenu = useCallback(() => {
        console.log("handleContextMenu")
        //handleContextMenu(id)
        return null
    },[sticker, selectSticker]);

    if(sticker.type==="image"){
        return <ImageSticker
            {...props}
            onDrag={handleDragStart}
            onDrop={handleDragEnd}
            onSelect={handleStickerSelect }
            onChange={(newAttrs:any) => { handleStickerChange(newAttrs) }}
            onContextMenu={handleContextMenu} />
    }
    
    return (
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
export const Shape = (props:any)=>{
    const { sticker } = props;
    //console.log(props,"PROPS");
    switch(sticker.shape.type){
        case 'star':
            return <StarSticker {...props} />
        case 'circle':
            return <EllipseSticker {...props} />
        case 'rect':
        default:
            return <RectSticker {...props} />
    }
}

