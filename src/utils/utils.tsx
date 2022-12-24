import { CanvasSize, Sticker } from "../types";

export function getRandomPosition(canvasWidth:number, canvasHeight:number, rotation:number=180){
    const minMax = {x: [canvasWidth/2 - 200, canvasWidth/2 + 200], y: [canvasHeight/2 - 100, canvasHeight/2 + 100]}
    return {
        x: getRandomInt(minMax.x[0], minMax.x[1]),
        y: getRandomInt(minMax.y[0], minMax.y[1]),
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
            type: Math.random() > .3 ? Math.random() > .3 ? "circle" : "star" : "rect",
            style: {
                fill:"#89b717",
                opacity: 0.8,             
                shadowColor: "black",
                shadowBlur: 2,
                shadowOpacity: 0.6,
                shadowOffsetX: 0.1,
                shadowOffsetY: 0.1,
                scaleX: 1,
                scaleY: 1,
                centeredScaling:true,
                stroke: "#c0c0c0",
                strokeWidth: 0,
            }
        }
    }
    return sticker;
}

export const getRandomColor = ()=>'#'+Math.floor(Math.random()*0xffffff).toString(16).padStart(6,'0');
export function getRandomInt(min:number,max:number,low=false){
    if (low) {
      return Math.floor( Math.random()* Math.random()*(max-min))+min;
    } else {
      return Math.floor( Math.random()*(max-min))+min;
    }
}


export function getStickerDefaults({type="shape",key='0', id='0', width=50, height=50, rotation, x , y}:any, {canvasWidth, canvasHeight}:CanvasSize) {
    let randomValues;
    if(!x || !y || !rotation){
        randomValues = getRandomPosition(canvasWidth, canvasHeight)
    }
    const sticker = {
        key:key,
        id: `${type}_${id}`,
        type,
        width,
        height,
        draggable:true,
        isDragging:false,
        x: x ? x : (randomValues?.x || 100),
        y: y ? y : (randomValues?.y || 100),
        rotation: (rotation || rotation==0) ? rotation : (randomValues?.rotation || 0),
    } as any;
    return sticker;
}

export function getShapeDefaults(type:string, additionalStyles?:any){
    let style = {
        opacity: 0.8,
        shadowColor: "black",
        shadowBlur: 2,
        shadowOpacity: 0.6,
        shadowOffsetX: 1,
        shadowOffsetY: 1,
        strokeWidth: 1,
        stroke: "#c0c0c0",
        scaleX: 1,
        scaleY: 1,
        ...additionalStyles
    };

    switch(type){
        case 'rect':
        case 'circle':
            style = {
                ...style,
                fill: getRandomColor(),
                opacity: 0.8,
                radius: getRandomInt(10,40)
            }
            break;
        case 'star':
            style = {
                ...style,
                fill: getRandomColor(),
                opacity: 0.8,
                numPoints: getRandomInt(5,12),
                innerRadius: getRandomInt(10,20),
                outerRadius:getRandomInt(40,50),
            }
            break;
        default:
            style = {
                ...style,
                opacity: 0.8
            }
            break;
    }

    return style




}


export function generateShapes(width:number, height:number) {
    return [...Array(5)].map((_, i) => generateSticker({type:"shape", id: `${i}` },{canvasWidth:width, canvasHeight:height}));
}

export function calculateAspectRatioFit(srcWidth:number, srcHeight:number, maxWidth:number, maxHeight:number) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
 }

 export function getRandomImage(){
    const images = [
        "https://i.ibb.co/s2x4KLJ/5qteutkji5k21.jpg",
        "https://i.ibb.co/tc8qZTZ/7lknk5qb0rr41.png",
        "https://i.ibb.co/3zhnfvm/9btu6b1ct4l21.jpg",
        "https://i.ibb.co/MP3YQ8r/ab94i3q4agk21.jpg",
        "https://i.ibb.co/R7ZWSmC/fortnite-pink-wallpaper-thumb.jpg",
        "https://i.ibb.co/6s6BW8x/https-blogs-images-forbes-com-insertcoin-files-2018-08-fortnite-lightnign2.png",
        "https://i.ibb.co/ZfYfZbZ/mt4br7y2gqg41.jpg",
        "https://i.ibb.co/f1Pgp4J/wp2342816.jpg",
    ]
    const randomImage = images[getRandomInt(0,images.length)]
    return randomImage
 };


 export const colorShade = (hexColor:string, magnitude:number) => {
    hexColor = hexColor.replace(`#`, ``);
    if (hexColor.length === 6) {
        const decimalColor = parseInt(hexColor, 16);
        let r = (decimalColor >> 16) + magnitude;
        r > 255 && (r = 255);
        r < 0 && (r = 0);
        let g = (decimalColor & 0x0000ff) + magnitude;
        g > 255 && (g = 255);
        g < 0 && (g = 0);
        let b = ((decimalColor >> 8) & 0x00ff) + magnitude;
        b > 255 && (b = 255);
        b < 0 && (b = 0);
        return `#${(g | (b << 8) | (r << 16)).toString(16)}`;
    } else {
        return hexColor;
    }
};