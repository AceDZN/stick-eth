import { useCallback } from "react";
import { useAppState } from "../../hooks/useAppStateContext";
import { useStickers } from "../../hooks/useStickersContext";
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

    const handleDragEnd = useCallback(() => {
        console.log("handleDragEnd")

        stopDraggingSticker()
        return null
    },[sticker, stopDraggingSticker]);

    const handleStickerSelect = useCallback(() => {
        console.log("handleStickerSelect")
        selectSticker(id)
        return null
    },[sticker, selectSticker]);


    return (
        <Shape 
            {...props}
            onDrag={()=>{ handleDragStart() }}
            onDrop={()=>{ handleDragEnd() }}
            onSelect={()=>{ handleStickerSelect() }}
            onChange={(newAttrs:any) => { handleStickerChange(newAttrs) }}
            />
    )
}
export const Shape = (props:any)=>{
    const { sticker } = props;
    //console.log(props,"PROPS");
    switch(sticker.shape.type){
        case 'star':
            return <StarSticker {...props} />
        case 'rect':
        default:
            return <RectSticker {...props} />
    }
}

