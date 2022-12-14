import { useAppState } from "../../hooks/useAppStateContext";
import { useStickers } from "../../hooks/useStickersContext";

export const AppMenu = () => {
    const [themeContext] = useAppState();
    const [stickersState] = useStickers();
    const {selectedSticker, background} = themeContext;
    const {stickers} = stickersState;
    const addSticker = ()=>{
        console.log("addSticker")
    }
    const removeSticker = ()=>{
        console.log("removeSticker")
    }
    const setSticker = ()=>{
        console.log("setSticker")
    }

    return (
       <div>
            <div>
                Background: {JSON.stringify(background)}
            </div>
            <div>
                selectedSticker: {selectedSticker}
            </div>
            <div>
                Stickers Size: {stickers.length}
            </div>
            <div>
                Stickers : [ {stickers.map( (s:any) =><span key={s.id}>{s.id+', '}</span>)} ]
            </div>
            <button onClick={addSticker}>Add Sticker</button>
            <button onClick={removeSticker}>Remove Sticker</button>
            <button onClick={setSticker}>Set Sticker</button>



            <div>
                DRAGGING?
                {stickers.map( (s:any) =><div key={s.id}>{s.id+' - '+s.isDragging}</div>)}

            </div>


            <div>
                Stickers : [ {stickers.map( (s:any) =><div key={s.id}>{JSON.stringify({id:s.id, shape:s.shape.type})+', '}</div>)} ]
            </div>
       </div>
    )
}