import React from 'react'
import { PageContextProvider } from '../hooks/usePageContext'
import type { PageContext } from '../types'
import { WagmiConfig } from 'wagmi'
import { client } from '../wagmi'
import { ConnectKitProvider } from "connectkit"
import { ThemeProvider, useTheme } from "../hooks/useThemeContext"


function ContextWrapper({ children, pageContext}: { children: React.ReactNode; pageContext: PageContext; }) {
  return (
    <WagmiConfig client={client}>
        <ConnectKitProvider>
            <PageContextProvider pageContext={pageContext}>
                <ThemeProvider>
                    
                    {children}

                </ThemeProvider>
            </PageContextProvider>
        </ConnectKitProvider>
    </WagmiConfig>
  )
}

export { ContextWrapper }