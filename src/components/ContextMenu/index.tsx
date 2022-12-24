import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { useAppState } from '../../hooks/useAppStateContext';
import { useStickers } from '../../hooks/useStickersContext';
import { ColorPicker, ColorSwatch } from '../ColorPicker';
import { ShapeMenu } from './ShapeMenu';


export const ContextMenu = () => {
    const [ sticker, setSticker ] = useState() as any;
    const [ appState ] = useAppState();
    const { contextMenu } = appState;
    const [ stickersState, { updateSticker }] = useStickers();

    const [ colorPicker, setColorPicker ] = useState(false);

    useEffect(()=>{
        const selectedSticker = stickersState.stickers.filter((sticker:any)=>sticker.id===contextMenu.id)[0]
        setSticker(selectedSticker)
    },[stickersState.stickers, contextMenu.id]);

    const handleStyleUpdate = useCallback((style:any)=>{
        updateSticker(sticker.id, {
            ...sticker,
            shape: {
                ...sticker.shape,
                style: {
                    ...sticker.shape.style,
                    ...style
                }
            }
        })
    },[ sticker ])

    const handleStickerUpdate = useCallback((sticker:any)=>{
        updateSticker(sticker.id, {
            ...sticker
        })
    },[ sticker ])

    
    if(!sticker) return null

    

    const {style} = sticker.shape;

    return (
        <div className={"absolute z-10 w-60 bg-amber-100 rounded-md	ring-offset-2 ring-2 ring-amber-500"} style={{top: contextMenu.position.y, left: contextMenu.position.x}}>
            {sticker.type==="shape" ? (<ShapeMenu sticker={sticker} updateSticker={updateSticker}/>) : null}
            {sticker.id}<br />
        </div>
    )
};