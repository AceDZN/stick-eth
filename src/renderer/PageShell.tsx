import "../index.css"
import React from 'react'
import type { PageContext } from '../types'
import { TopNavbar } from "../components/TopNavbar"
import { useTheme } from "../hooks/useThemeContext"
import { ContextWrapper } from "./ContextWrapper"
import { useLoaded } from "../hooks/useLoaded"


function PageShell({ children, pageContext}: { children: React.ReactNode; pageContext: PageContext; }) {
  const loaded = useLoaded();
  return loaded ? (
    <React.StrictMode>
      <ContextWrapper pageContext={pageContext}>
        <Layout>
          <TopNavbar />
          <Content>{children}</Content>
        </Layout>
      </ContextWrapper>
    </React.StrictMode>
  ) : <div>Haven't loaded yet :\</div>
}

function Layout({ children }: { children: React.ReactNode }) {
  const themeContext = useTheme();
  const {theme} = themeContext;
  return (
    
    <div className={`${theme} w-screen h-screen text-slate-900 dark:text-white text-base font-medium tracking-tight`}>
      
      {children}
      
    </div>
  )
}


function Content({ children }: { children: React.ReactNode }) {
  return (
    <div>
      {children}
    </div>
  )
}


export { PageShell }
