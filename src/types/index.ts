export type { PageContextServer }
export type { PageContextClient }
export type { PageContext }
export type { PageProps }

import type { PageContextBuiltIn } from 'vite-plugin-ssr'
// import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client/router' // When using Client Routing
import type { PageContextBuiltInClient } from 'vite-plugin-ssr/client' // When using Server Routing

type Page = (pageProps: PageProps) => React.ReactElement
type PageProps = {}

export type PageContextCustom = {
  Page: Page
  pageProps?: PageProps
  urlPathname: string
  exports: {
    documentProps?: {
      title?: string
      description?: string
    }
  }
}

type PageContextServer = PageContextBuiltIn<Page> & PageContextCustom
type PageContextClient = PageContextBuiltInClient<Page> & PageContextCustom

type PageContext = PageContextClient | PageContextServer


export type CanvasSize = {
  canvasWidth:number, canvasHeight:number
}


export interface ThemeContextType {
  theme: string //'default' | 'dark' | 'light',
  setTheme: (d: string)=>void
}

export interface CanvasContextType {
  canvas: {
    element: any,
    context: any,
    width: number,
    height:number,
  },
  setCanvasElement:(c:any)=>any,
  setCanvasContext:(c:any)=>any,
  setDimensions:(d:any)=>any
}

export type Sticker = {
  type?:"shape"|"image"|"text",
  id:string,
  width?:number,
  height?:number,
  rotation?:number,
  x?:number,
  y?:number,
  zIndex?:number,
  [key: string]: any,
  draggable?:boolean,
  onDrag?:any,
  onDrop?:any,
  onSelect?:any,
  onChange?:any,
}

export interface ShapeSticker extends Sticker {
  type?: "shape",
  shape: {
    type: "star" | "rect" | "circle"
  }; 
}

export interface ImageSticker extends Sticker {
  type?: "image",
  src: string
}

export interface TextSticker extends Sticker {
  type?: "text",
  text: {
    value: string,
    font: any
  }
}

export interface AppStateContextType {
  
  selectedSticker: string|null|undefined,
  background:{
    type: "color" | "gradient" | "image",
    color?: string,
    gradient?: string,
    image?: string
  }
}


export interface StickersContextType {
  stickers:any
}

