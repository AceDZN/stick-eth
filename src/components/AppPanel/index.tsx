import { useCallback, useEffect } from "react";
import { useElementSize } from "usehooks-ts";
import { useAppState } from "../../hooks/useAppStateContext";
import { useStickers } from "../../hooks/useStickersContext";
import { AppMenu } from "../AppMenu";
import CanvasApp from "../CanvasApp";
import { ContextMenu } from "../ContextMenu";
const MAX_SIZE = 630

export const AppPanel = (props: { width?: number, height?: number }) => {
    const [squareRef, { width, height }] = useElementSize()
    const [appState, {unselectSticker}] = useAppState();
    const [stickersState, {removeSticker}] = useStickers();
    let size = (width > 0 && height > 0) ? (width <= height ? width : height) : width;
    size = size < MAX_SIZE ? size : MAX_SIZE;

    const handleKeyDown = useCallback((e:any) => {
        if(!appState.selectedSticker) {
        return 
        }
        switch(e.keyCode){
        case 8:
        case 46:
            if(!appState.selectedSticker) return
            removeSticker(appState.selectedSticker);
            unselectSticker()
            break;
        deafult:
        break;
        }
    }, [appState?.selectedSticker, removeSticker])

    return (
        <main className='grid gap-4 lg:grid-cols-2 content-center justify-center'>
            <section className='p-5 w'>
            <div ref={squareRef} tabIndex={1} onKeyDown={handleKeyDown} className="relative">
                <CanvasApp width={size} height={size}/>
                { appState.contextMenu?.id ? <ContextMenu /> : null }
            </div>
            </section>
            <div className=''>
                <AppMenu width={size} height={size} />
            </div>
            
        </main>
    )
}