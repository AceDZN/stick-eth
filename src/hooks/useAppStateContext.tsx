import React, { createContext, useContext, useMemo, useReducer, useEffect, useState, ReactNode } from 'react'
import useLocalStorage from './useLocalStorage'
import type { AppStateContextType, Sticker } from '../types'

interface AppStateActionInterface {
  type: string;
  payload: any;
}
type DispatchInterface = (action: AppStateActionInterface) => void;

//const AppStateContext = React.createContext<AppStateContextType>({} as any)
const initialState = {
  //state:{
    selectedSticker: null,
    background:{
      type: "color",
      color: "red",
      gradient: "",
      image: ""
    }

  //}
} as AppStateContextType

const initialContext = {
    state:{
      selectedSticker: null,
      background:{
        type: "color",
        color: "red",
        gradient: "",
        image: ""
      }
    } as AppStateContextType,
    dispatch: (action: AppStateActionInterface) => {
        //console.log("dispatching")
    } 
};

  const AppStateContext = createContext<{
        state: AppStateContextType;
        dispatch: DispatchInterface;
      }
      | undefined
    >(undefined);

export default AppStateContext;


const reducerAppState = (
    state: AppStateContextType,
    action: AppStateActionInterface
  ): AppStateContextType => {
    const currentState = {...state};
    const {selectedSticker, background} = currentState;
    
    switch (action.type) {
      case "unselectSticker":
        return {...state, selectedSticker: null}
      case "selectSticker":
        if(action.payload.id !== state.selectedSticker){
          return {...state, selectedSticker: action.payload.id}
        }
        return {...state}
      case "setBackground":
        return { ...state, background: action.payload.background}
      default:
        throw new Error("Invalid action type in context.");
    }
  };


const AppStateProvider: any = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducerAppState, initialState);
  
    const memoizedAppState = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  
    return (
      <AppStateContext.Provider value={memoizedAppState}>{children}</AppStateContext.Provider>
    );
};

const useAppState = () => {
    
    const {state, dispatch } = useContext(AppStateContext) as any;
    //console.log("USE AppState", state)


    const startDraggingSticker = (id:string)=>{
        dispatch({type:"startDraggingSticker", payload:{id}});
    }
    const stopDraggingSticker = (id:string)=>{
      dispatch({type:"stopDraggingSticker", payload:{}});
    }
    const setStickers = (stickers:any)=>{
      dispatch({type:"setStickers", payload:{stickers}});
    }
    const selectSticker = (id:string)=>{
      dispatch({type:"selectSticker", payload:{id}});
    }
    const unselectSticker = ()=>{
      dispatch({type:"unselectSticker", payload:{}});
    }
    const updateSticker = (id: string, sticker:any)=>{
      dispatch({type:"updateSticker", payload:{sticker}});
    }



    return [ state, { startDraggingSticker, stopDraggingSticker, setStickers, selectSticker,updateSticker, unselectSticker}  ]
  };


  export { AppStateProvider, useAppState }
