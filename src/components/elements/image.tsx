import React from "react";
import { Image, Transformer } from "react-konva";
import useImage from "use-image";

export const ImageSticker = (props:any) => {
    const { sticker, isSelected, onDrag, onDrop, onSelect, onChange, onContextMenu } = props;
    const [image, status] = useImage(sticker.src);
    const shapeRef = React.useRef<any>();
    const trRef = React.useRef<any>();

    React.useEffect(() => {
      if (isSelected && trRef.current && trRef.current) {
        // we need to attach transformer manually
        trRef.current.nodes([shapeRef.current]);
        trRef.current.getLayer().batchDraw();
      }
    }, [isSelected, trRef?.current]);
      

    return (
      <>
        <Image
            image={image}
            ref={shapeRef}
            key={sticker.id}
            id={sticker.id}
            isSelected={isSelected}
            x={sticker.x}
            y={sticker.y}
            draggable={sticker.draggable}
            rotation={sticker.rotation}
            width={sticker.width}
            height={sticker.height}
            {...sticker.shape.style}
            shadowOffsetX={sticker.isDragging ? sticker.shape.style.shadowOffsetX*2 : sticker.shape.style.shadowOffsetX}
            shadowOffsetY={sticker.isDragging ? sticker.shape.style.shadowOffsetY*2 : sticker.shape.style.shadowOffsetY}
            scaleX={sticker.isDragging ? sticker.shape.style.scaleX+.01 : sticker.shape.style.scaleX}
            scaleY={sticker.isDragging ? sticker.shape.style.scaleY+.01 : sticker.shape.style.scaleY}
            
            onDragStart={onDrag}
            onDragEnd={()=>{
                const node = shapeRef.current;
                onChange({
                ...sticker,
                x: node.x(),
                y: node.y()
                });
                onDrop();
            }}


            onClick={onSelect}
            onTap={onSelect}
            onChange={onChange}
            onContextMenu={onContextMenu}
            centeredScaling={true}
            onTransformEnd={(e) => {
                const node = shapeRef.current;
                const scaleX = node.scaleX();
                const scaleY = node.scaleY();
                
                console.log(node,"NODE");
                console.log(e,"EVENT");
                // we will reset it back
                node.scaleX(1);
                node.scaleY(1);
                onChange({
                ...sticker,
                x: node.x(),
                y: node.y(),
                // set minimal value
                width: ( node.width() * scaleX),
                height: (node.height() * scaleY),
                shape:{
                    ...sticker.shape, 
                    style: {
                    ...sticker.shape.style,
                    scaleX: 1,
                    scaleY: 1,
                    skewX:node.skewX(),
                    skewY:node.skewY()
                    }
                }
                
                });
            }}
      />
        {isSelected && (
          <Transformer
            ref={trRef}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.width < 5 || newBox.height < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />
        )}
      </>
    );
  };