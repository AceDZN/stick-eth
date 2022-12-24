import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { useCanvas } from '../../hooks/useCanvasContext';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Star, Text, Image } from 'react-konva';
import useImage from 'use-image';
import { Sticker } from '../../types';
import { generateShapes } from '../../utils/utils';
import { useAppState } from '../../hooks/useAppStateContext';
import { StickerEl } from '../elements';
import { useStickers } from '../../hooks/useStickersContext';
import { BackgroundLayer } from '../elements/background';


//const INITIAL_STICKERS = generateStickers();
const CanvasApp = (props: { width?: number, height?: number }) => {
    /*
    const canvasEl = useRef(null);

    const [state,setCanvas] = useCanvas({element: canvasEl.current});
    console.log([state,setCanvas],"canvasContext");

    useEffect(()=>{
        console.log("disptching now");
        setCanvas(canvasEl.current);
    },[canvasEl.current])
*/


    const {width=100,height=100} = props;
    const [state, { unselectSticker}] = useAppState();
    const [stickersState, {setStickers}] = useStickers();
    //console.log(stickersState,"stickerState");
    
    //const [stickers, setStickers] = React.useState(INITIAL_STATE);

    useLayoutEffect(()=>{
        const s = generateShapes(width, height);
        setStickers(s)
    },[width, height]);

  // deselect when clicked on empty area
    const checkDeselect = useCallback((e:any) => {
        console.log(e.target,"target clicked");
        const clickedOnEmpty = e.target === e.target.getStage() || e.target.attrs.id === "background-layer";
        if (clickedOnEmpty) {
            unselectSticker()
            unselectSticker();
        }
    },[stickersState, unselectSticker]);


    return (
        <Stage width={width} height={height} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
            <Layer>
                <BackgroundLayer width={width} height={height} params={state.background} />
            </Layer>



            <Layer>
                <Text text="Try to drag a star" />
                
                {stickersState.stickers.map((sticker:Sticker, i:number) => (
                    <StickerEl
                        key={sticker.id || sticker.key}
                        sticker={sticker}
                        isSelected={sticker.id === state.selectedSticker}
                    />
                ))}
            </Layer>
        </Stage>
    );
}

export default CanvasApp