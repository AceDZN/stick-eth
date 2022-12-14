import { CanvasSize, Sticker } from "../types";

export function getRandomPosition(canvasWidth:number, canvasHeight:number, rotation:number=180){
    return {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
        rotation: Math.random() * rotation,
    }
}

export function generateSticker({type="shape", src, id='0', width=100, height=100, rotation, x , y}:Sticker, {canvasWidth, canvasHeight}:CanvasSize) {
    let randomValues;
    if(!x && !y && !rotation){
        randomValues = getRandomPosition(canvasWidth, canvasHeight)
    }
    const sticker = {
        id: `${type}_${id}`,
        src,
        type,
        width,
        height,
        draggable:true,
        isDragging:false,
        x, y, rotation,
        ...randomValues
    } as any;
    if(type==='shape'){
        sticker.shape = {
            type: Math.random() > .5 ? "star" : "rect",
            style: {
                numPoints: 5,
                innerRadius: 20,
                outerRadius:40,
                fill:"#89b717",
                opacity: 0.8,             
                shadowColor: "black",
                shadowBlur: 10,
                shadowOpacity: 0.6,
                shadowOffsetX: 5,
                shadowOffsetY: 5,
                scaleX: 1,
                scaleY: 1,
            }
        }
    }
    return sticker;
}

export function generateShapes(width:number, height:number) {
    return [...Array(5)].map((_, i) => generateSticker({type:"shape", id: `${i}` },{canvasWidth:width, canvasHeight:height}));
}
export function generateImages(width:number, height:number) {
    return [...[
        'https://konvajs.github.io/assets/yoda.jpg','https://konvajs.org/assets/lion.png'
    ]].map((_, i) => generateSticker({type:"image", id: `${i}`,src: _},{canvasWidth:width, canvasHeight:height}));
}
