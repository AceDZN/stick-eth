import React from "react";
import { Rect, Star, Transformer } from "react-konva";

export const StarSticker = (props:any) => {
    const { sticker, isSelected, onDrag, onDrop, onSelect, onChange } = props;
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
        <Star
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
          fill={sticker.isDragging ? "purple" : isSelected ? "blue" : sticker.shape.style.fill}
          shadowOffsetX={sticker.isDragging ? sticker.shape.style.shadowOffsetX*2 : sticker.shape.style.shadowOffsetX}
          shadowOffsetY={sticker.isDragging ? sticker.shape.style.shadowOffsetY*2 : sticker.shape.style.shadowOffsetY}
          scaleX={sticker.isDragging ? sticker.shape.style.scaleX+.2 : sticker.shape.style.scaleX}
          scaleY={sticker.isDragging ? sticker.shape.style.scaleY+.2 : sticker.shape.style.scaleY}

          onDragStart={onDrag}
          onDragEnd={onDrop}
          onClick={onSelect}
          onTap={onSelect}
          onChange={onChange}
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