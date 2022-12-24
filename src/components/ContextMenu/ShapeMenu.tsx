import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { useAppState } from '../../hooks/useAppStateContext';
import { useStickers } from '../../hooks/useStickersContext';
import { ColorPicker, ColorSwatch } from '../ColorPicker';

const RangeSlider = ({min, max, steps, onChange, value, label}:{min:number, max:number, steps:number, onChange:(n:number)=>void, value:number, label:string})=>{
    return (
        <div className="grid grid-cols-2 gap-4 content-center items-center p-2">
            <label htmlFor="minmax-range" className="block  text-sm font-medium text-gray-900 dark:text-white">{label}</label>
            <input id="minmax-range" type="range" min={min} max={max} value={value} onChange={(e)=>onChange(parseInt(e.target.value))} step={steps} className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700" />
        </div>
    )
}

const StarSettings = ({numPoints, innerRadius, outerRadius,width, onChange}:{numPoints:number, innerRadius:number, outerRadius:number,width:number, onChange:(t:string, e:any)=>void})=>{
    return (<>
        {numPoints ? <RangeSlider label={"Points"} min={2} max={30} value={numPoints} steps={1} onChange={(e)=>{onChange('numPoints', e)}} /> : null}
        {innerRadius ? <RangeSlider label={"Inner Radius"} min={15} max={outerRadius - width/10} value={innerRadius} steps={.1} onChange={(e)=>{onChange('innerRadius', e)}} /> : null}
        {outerRadius ? <RangeSlider label={"Outer Radius"} min={innerRadius+15} max={width} value={outerRadius} steps={.1} onChange={(e)=>{onChange('outerRadius', e)}} /> : null}
        </>
    )
}

const StrokeSettings = ({width, onChange, color}:{color:string, width:number, onChange:(t:string, e:any)=>void})=>{
    return (
        <>
            <RangeSlider label={"Stroke"} min={0} max={10} value={width} steps={1} onChange={(e)=>{onChange('strokeWidth', e)}} />
            <ColorSwatch color={color } onColorChange={(e)=>{onChange('stroke', e.hex)}} />
        </>
    )
}

export const ShapeMenu = ({sticker, updateSticker}:{sticker:any, updateSticker:(id:string,sticker:any)=>void})=>{
    
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
    },[ sticker ]);
    
    const handleStyleChange = (type:string, value:any)=>{
        const s = {} as any; 
        s[type] = value;
        handleStyleUpdate({...s})
    };

    
    const {shape:{ style }} = sticker;
    return (
        <div>
            {style.fill ? (
                <div className="grid grid-cols-2 gap-4 content-center items-center p-2">
                    <div className="block  text-sm font-medium text-gray-900 dark:text-white">Color</div>
                    <ColorSwatch color={style.fill } onColorChange={(e)=>{handleStyleChange('fill', e.hex)}} />
                </div>
            ) : null}
            {sticker?.shape?.style?.stroke ? <StrokeSettings width={sticker.shape.style.strokeWidth} color={sticker.shape.style.stroke} onChange={handleStyleChange} /> : null }
            {sticker.type==='shape' && sticker.shape.type==='star' ? <StarSettings onChange={handleStyleChange} width={sticker.width} numPoints={sticker.shape.style.numPoints} innerRadius={sticker.shape.style.innerRadius} outerRadius={sticker.shape.style.outerRadius} /> : null}
        </div>
    )
    
}