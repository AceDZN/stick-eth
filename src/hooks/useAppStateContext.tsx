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
    contextMenu: {},
    selectedSticker: null,
    background:{
      type: "image",
      fill: "white",
      gradient: {
        colorStart:"red",
        colorEnd:"blue",
        angle:140
      },
      image:  'https://konvajs.github.io/assets/yoda.jpg'
    }

  //}
} as AppStateContextType
/*
const initialContext = {
    state:{
      selectedSticker: null,
      background:{
        type: "color",
        fill: "red",
        gradient: "",
        image: ""
      }
    } as AppStateContextType,
    dispatch: (action: AppStateActionInterface) => {
        //console.log("dispatching")
    } 
};
*/

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
        return {...state, selectedSticker: null, contextMenu: {}}
      case "openContextMenu":
        return {...state, contextMenu: action.payload.contextMenu}
      case "closeContextMenu":
        return {...state, contextMenu: {}}
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

    const openContextMenu = (contextMenu:any)=>{
      dispatch({type:"openContextMenu", payload: {contextMenu}})
    }
    const closeContextMenu = ()=>{
      dispatch({type:"closeContextMenu", payload: {}})
    }
    const selectSticker = (id:string)=>{
      dispatch({type:"selectSticker", payload:{id}});
    }
    const unselectSticker = ()=>{
      dispatch({type:"unselectSticker", payload:{}});
    }
    const setBackground = (background:any)=>{
      dispatch({type:"setBackground", payload:{background}});
    }
    return [ state, { openContextMenu,closeContextMenu, selectSticker, unselectSticker, setBackground}  ]
  };


  export { AppStateProvider, useAppState }
