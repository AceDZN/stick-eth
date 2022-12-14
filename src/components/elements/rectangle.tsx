import React from "react";
import { Rect, Transformer } from "react-konva";

export const RectSticker = (props:any) => {
    const { sticker, isDragging, isSelected, onDrag, onDrop, onSelect, onChange } = props;
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
        <Rect
            ref={shapeRef}
            key={sticker.id}
            id={sticker.id}
            isSelected={isSelected}
            x={sticker.x}
            y={sticker.y}
            width={sticker.width}
            height={sticker.height}
            draggable={sticker.draggable}
            rotation={sticker.rotation}
            
            {...sticker.shape.style}

            shadowOffsetX={isDragging ? sticker.shape.style.shadowOffsetX*2 : sticker.shape.style.shadowOffsetX}
            shadowOffsetY={isDragging ? sticker.shape.style.shadowOffsetY*2 : sticker.shape.style.shadowOffsetY}
            scaleX={isDragging ? sticker.shape.style.scaleX+.2 : sticker.shape.style.scaleX}
            scaleY={isDragging ? sticker.shape.style.scaleY+.2 : sticker.shape.style.scaleY}

            onDragStart={onDrag}
            onDragEnd={onDrop}
            onClick={onSelect}
            onTap={onSelect}
           
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