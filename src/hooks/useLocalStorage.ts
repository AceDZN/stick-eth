import { useState, useEffect } from "react";

export default function useLocalStorage(key:string, initialValue:string) {

  const getItem = () => {
    let localValue = global.localStorage.getItem(key);
    console.log("localValue",localValue);    
    if(typeof localValue === 'string') return localValue as string
    return initialValue as string
  }
  const removeItem = ()=>{
    global.localStorage.removeItem(key)
    return true
  }
  const setItem = (v:string) => {
    global.localStorage.setItem(key, v)
    return true
  };

 

  return [getItem, setItem, removeItem];
}