import React from "react";
import { Rect, Image } from "react-konva";
import useImage from "use-image";

function getGradientProps(props:any){
    const {width, height, angleInDeg, colorStart, colorEnd } = props;
	// Specify angle in degrees
	

	// Compute angle in radians - CSS starts from 180 degrees and goes clockwise
	// Math functions start from 0 and go anti-clockwise so we use 180 - angleInDeg to convert between the two
	const angle = ((180 - angleInDeg) / 180) * Math.PI

	// This computes the length such that the start/stop points will be at the corners
	const length =
		Math.abs(width * Math.sin(angle)) + Math.abs(height * Math.cos(angle))

	// Compute the actual x,y points based on the angle, length of the gradient line and the center of the div
	const halfx = (Math.sin(angle) * length) / 2.0
	const halfy = (Math.cos(angle) * length) / 2.0
	const cx = width / 2.0
	const cy = height / 2.0
	const x1 = cx - halfx
	const y1 = cy - halfy
	const x2 = cx + halfx
	const y2 = cy + halfy
    return {
        fillPriority: "linear-gradient",
        fillLinearGradientStartPoint:{ x: x1, y: y1 },
        fillLinearGradientColorStops: [
            0, colorStart,
            1, colorEnd,
        ]
    }
}
export const BackgroundLayer = (props:any) => {
    const { params, width, height, onSelect, onContextMenu } = props;
    const { type ="color",fill="rgba(165, 142, 251, 1)",  gradient} = params;
    
    let elementProps = {
        width,
        height,
        x:0,
        y:0,
        fill: params?.fill,
        key: 'background-layer',
        id: 'background-layer',
        isSelected:false,
        draggable: false,
        rotation:0,
        
    } as any;

    switch(params.type){
        case "image":
            const [image, status] = useImage(params.image);
            elementProps = {
                ...elementProps,
                image: image
            }
        case 'gradient':
            const { angle=140, colorStart="rgba(165, 142, 251, 1)", colorEnd="rgb(233, 191, 248)" } = gradient;
            elementProps = {
                ...elementProps,
                ...getGradientProps({
                    angleInDeg: angle,
                    width,
                    height,
                    colorStart, colorEnd
                })
            }
            break;
        case 'color':
        default:
            elementProps = {
                ...elementProps,
                fill: params.fill
            }
            break
    }
    
        
    

    if(params.type === "image"){
        console.log("params.type === image", params);
        
        return (
            <Image
                {...elementProps}
                onClick={onSelect}
                onTap={onSelect}
                onContextMenu={onContextMenu}
            />
        )
    }
    return (
        <Rect
            {...elementProps}
            onClick={onSelect}
            onTap={onSelect}
            onContextMenu={onContextMenu}
            
        />
    );
  };