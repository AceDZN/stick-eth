import React from "react";
import { Ellipse, Transformer } from "react-konva";

export const EllipseSticker = (props:any) => {
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
        <Ellipse
            ref={shapeRef}
            key={props.id}
            {...props.style}
            {...props}
            onDragEnd={()=>{
              const node = shapeRef.current;
              props.onDragEnd({
                x: node.x(),
                y: node.y()
              })
            }}
            onTransformEnd={() => {
              // transformer is changing scale of the node
              // and NOT its width or height
              // but in the store we have only width and height
              // to match the data better we will reset scale on transform end
              const node = shapeRef.current;
              const scaleX = node.scaleX();
              const scaleY = node.scaleY();
              props.onTransformEnd(node,scaleX,scaleY);
              
              node.scaleX(1);
              node.scaleY(1);
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