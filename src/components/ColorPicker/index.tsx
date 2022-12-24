import React, { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { ChromePicker } from 'react-color'

export const ColorPicker = ({color="red",visible =true,onClose, onColorChange=(c)=>{console.log(c,"onColorChange")}}: {visible : boolean, color:string, onColorChange?: (c:any)=>void, onClose?:()=>void }) => {
    return visible ? (
        <div className="popover absolute z-2">
            {onClose ? <div className="cover fixed top-0 left-0 right-0 bottom-0" onClick={ onClose }/> : null}
            <ChromePicker color={ color } onChange={ onColorChange } />
        </div>
    ) : null     
};

export const ColorSwatch = ({color="red", onColorChange}:{color:string, onColorChange?: (c:any)=>void})=>{
    const [colorPicker, setColorPicker] = useState(false);
    return (
        <> 
            <div style={{
                width: "100%",
                height: "2rem",
                backgroundColor: color,
                border: "2px solid white",
            }}
                onClick={()=>{setColorPicker(true)}}
            >
            </div>
            {colorPicker ? <ColorPicker  visible={true} color={color} onColorChange={onColorChange} onClose={()=>{setColorPicker(false)}}/> : null}
        </>
    )
}