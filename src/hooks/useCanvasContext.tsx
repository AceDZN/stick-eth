import React, { createContext, useContext, useMemo, useReducer, useEffect, useState, ReactNode } from 'react'
import useLocalStorage from './useLocalStorage'
import type { CanvasContextType } from '../types'

//const CanvasContext = React.createContext<CanvasContextType>({} as any)
const initialContext = {
    state:{
        canvas: {
            element:null,
            context:null,
            width:100,
            height:100
        } as CanvasInterface
    },
    dispatch: (action: CanvasActionInterface) => {
        console.log("dispatching")
    } 
};
interface CanvasInterface {
    element: any,
    context: any,
    width: number,
    height:number,
  }
interface CanvasContextInterface {
    canvas: CanvasInterface,
    setCanvasElement:(c:any)=>any,
    setCanvasContext:(c:any)=>any,
    setDimensions:(d:any)=>any
  }
  
  interface CanvasActionInterface {
    type: "setCanvas"
    payload: CanvasInterface;
  }
  
  type DispatchInterface = (action: CanvasActionInterface) => void;

  const CanvasContext = createContext<{
        state: CanvasInterface;
        dispatch: DispatchInterface;
        }
        | undefined
    >(undefined);

export default CanvasContext;


const reducerCanvas = (
    state: CanvasInterface,
    action: CanvasActionInterface
  ): CanvasInterface => {
    switch (action.type) {
      case "setCanvas":
        return { ...state, element: action.payload.element };
      default:
        throw new Error("Invalid action type in context.");
    }
  };


const CanvasProvider: any = ({ children }: { children: React.ReactNode }) => {
    const [state, dispatch] = useReducer(reducerCanvas, {element:null,context:null,width:100,height:100,});
  
    const memoizedCanvas = useMemo(() => ({ state, dispatch }), [state, dispatch]);
  
    return (
      <CanvasContext.Provider value={memoizedCanvas}>{children}</CanvasContext.Provider>
    );
};

const useCanvas = (canvasEl:any) => {
    
    const {state, dispatch } = useContext(CanvasContext) as any;

    const setCanvas = (el:any)=>{
        dispatch({type:"setCanvas", payload:{element: el}});
    }
    
    useEffect(() => {
        if(state && !state?.element){
            setCanvas(canvasEl)
        }
        
    }, [canvasEl])


    return [ state, setCanvas  ]
  };


  export { CanvasProvider, useCanvas }
