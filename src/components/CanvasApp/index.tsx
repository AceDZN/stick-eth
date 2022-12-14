import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { useCanvas } from '../../hooks/useCanvasContext';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Star, Text, Image } from 'react-konva';
import useImage from 'use-image';
import { Sticker } from '../../types';
import { generateImages, generateShapes } from '../../utils/utils';
import { useAppState } from '../../hooks/useAppStateContext';
import { StickerEl } from '../elements';
import { useStickers } from '../../hooks/useStickersContext';



const doodle = "https://www.google.com/logos/doodles/2022/2022-world-cup-semi-finals-dec-13-14-6753651837110008-s.png";
const ImageElement = ({id,src=doodle,onDrop,onDrag,x,y,width,height,rotation, isDragging }:Sticker)=>{
    const [image, status] = useImage(src);
 
    return  (
        <Image
            image={image}
            key={id}
            id={id}
            x={x}
            y={y}
            opacity={0.8}
            draggable
            rotation={rotation}
            shadowColor="black"
            shadowBlur={10}
            shadowOpacity={0.6}
            shadowOffsetX={isDragging ? 10 : 5}
            shadowOffsetY={isDragging ? 10 : 5}
            scaleX={isDragging ? 1.2 : 1}
            scaleY={isDragging ? 1.2 : 1}
            onDrag={onDrag}
            onDrop={onDrop}
        />
    )
}
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
    const INITIAL_STATE = generateShapes(width, height)// [...Array(5)].map((_, i) => generateSticker({type:"star", id: i },{canvasWidth:width, canvasHeight:height}));
    const INITIAL_IMAGES = generateImages(width, height)
    
    //const [stickers, setStickers] = React.useState(INITIAL_STATE);

    useLayoutEffect(()=>{
        const s = generateShapes(width, height);
        setStickers(s)
    },[width, height]);

  // deselect when clicked on empty area
    const checkDeselect = useCallback((e:any) => {
        
        const clickedOnEmpty = e.target === e.target.getStage();
        if (clickedOnEmpty) {
            unselectSticker();
        }
    },[stickersState, unselectSticker]);


    return (
        <Stage width={width} height={height} onMouseDown={checkDeselect} onTouchStart={checkDeselect}>
            <Layer>
                <Text text="Try to drag a star" />
                
                {stickersState.stickers.map((sticker:Sticker, i:number) => (
                    <StickerEl
                        key={sticker.id}
                        sticker={sticker}
                        isSelected={sticker.id === state.selectedSticker}
                    />
                ))}
            </Layer>
        </Stage>
    );
}

export default CanvasApp