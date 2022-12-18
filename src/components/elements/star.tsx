import React from "react";
import { Rect, Star, Transformer } from "react-konva";

export const StarSticker = (props:any) => {
    const { sticker, isSelected, onDrag, onDrop, onSelect, onChange, onContextMenu } = props;
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
          scaleX={sticker.isDragging ? sticker.shape.style.scaleX+.1 : sticker.shape.style.scaleX}
          scaleY={sticker.isDragging ? sticker.shape.style.scaleY+.1 : sticker.shape.style.scaleY}
          
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
  
            // we will reset it back
            node.scaleX(1);
            node.scaleY(1);
            console.log("node",node, node.outerRadius());
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
                  innerRadius: node.innerRadius() * scaleX * scaleY,
                  outerRadius: node.outerRadius() * scaleX * scaleY,
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