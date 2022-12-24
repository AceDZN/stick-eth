import React, { createContext, useContext, useMemo, useReducer, useEffect, useState, ReactNode } from 'react'
import useLocalStorage from './useLocalStorage'
import type { StickersContextType, Sticker } from '../types'

interface StickersActionInterface {
  type: string;
  payload: any;
}
type DispatchInterface = (action: StickersActionInterface) => void;

//const StickersContext = React.createContext<StickersContextType>({} as any)
const initialState = {
    stickers: []
} as StickersContextType

const initialContext = {
    state:{
        stickers: []
    } as StickersContextType,
    dispatch: (action: StickersActionInterface) => {
        console.log("dispatching")
    } 
};

  const StickersContext = createContext<{
        state: StickersContextType;
        dispatch: DispatchInterface;
      }
      | undefined
    >(undefined);

export default StickersContext;


const reducerStickers = (
    state: StickersContextType,
    action: StickersActionInterface
  ): StickersContextType => {
    switch (action.type) {
      case "setStickers":
        console.log("setStickers", action.payload.stickers)
        return { ...state, stickers: action.payload.stickers}
        
      case "addSticker":
        console.log("addSticker", action.payload.sticker)
        return { ...state, stickers: [...state.stickers, action.payload.sticker] };
      case "removeSticker":
        if(!action.payload.id){
          return {...state}
        }
        console.log("removeSticker", action.payload.id)
        const indexToRemove = state.stickers.map(function(o:Sticker) { return o.id; }).indexOf(action.payload.id);
        const removed_stickers = [...state.stickers.slice(0, indexToRemove), ...state.stickers.slice(indexToRemove + 1)];
        return { ...state, stickers: [...removed_stickers] };
      case "shuffleStickers":
        console.log("shuffleStickers", action.payload.id)
        const shuffled_stickers = [...state.stickers.map((value:any) => ({ value, sort: Math.random() })).sort((a:any, b:any) => a.sort - b.sort).map(({ value }:{ value:any }) => value)];
        return { ...state, stickers: [...shuffled_stickers] };
  
      case "startDraggingSticker":        
        console.log("startDraggingSticker", action.payload.id)
        return {...state, stickers: state.stickers.map((sticker:Sticker) => ({ ...sticker, isDragging: sticker.id === action.payload.id }))}

      case "stopDraggingSticker":
        console.log("stopDraggingSticker", "isDragging: false ")
        return {...state, stickers: state.stickers.map((sticker:Sticker) => ({ ...sticker, isDragging: false }))}
      
      case "updateSticker":
        console.log("updateSticker", action.payload.id)
        const updatedIndex = state.stickers.map(function(o:Sticker) { return o.id; }).indexOf(action.payload.id);
        const n_stickers = [...state.stickers];
        n_stickers[updatedIndex] = action.payload.sticker

        return {...state, stickers: n_stickers}

      default:
        throw new Error("Invalid action type in context.");
    }
  };


const StickersProvider: any = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducerStickers, initialState);
  
    const memoizedStickers = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  
    return (
      <StickersContext.Provider value={memoizedStickers}>{children}</StickersContext.Provider>
    );
};

const useStickers = () => {
    
    const {state, dispatch } = useContext(StickersContext) as any;

    const startDraggingSticker = (id:string)=>{
      dispatch({type:"startDraggingSticker", payload:{id}});
    }
    const stopDraggingSticker = (id:string)=>{
      dispatch({type:"stopDraggingSticker", payload:{}});
    }
    const setStickers = (stickers:any)=>{
      dispatch({type:"setStickers", payload:{stickers}});
    }
    const updateSticker = (id: string, sticker:any)=>{
      dispatch({type:"updateSticker", payload:{sticker, id}});
    }

    const addSticker = (sticker:any)=>{
      dispatch({type:"addSticker", payload:{sticker}});
    }

    const removeSticker = (id:string)=>{
      dispatch({type:"removeSticker", payload:{id}});
    }

    const shuffleStickers = ()=>{
      dispatch({type:"shuffleStickers", payload:{}});
    }



    return [ state, { startDraggingSticker, stopDraggingSticker,addSticker, removeSticker,shuffleStickers, setStickers,updateSticker}  ]
  };


  export { StickersProvider, useStickers }
