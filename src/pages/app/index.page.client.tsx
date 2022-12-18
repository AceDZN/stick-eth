import React from 'react'
import { AppPanel } from '../../components/AppPanel'
import { AppStateProvider } from '../../hooks/useAppStateContext'
import { CanvasProvider } from '../../hooks/useCanvasContext'
import { StickersProvider } from '../../hooks/useStickersContext'
import './code.css'

export { Page }

function Page() {
  return (
    <>
      <CanvasProvider>
        <AppStateProvider>
          <StickersProvider>
            <AppPanel />
          </StickersProvider>
        </AppStateProvider>
      </CanvasProvider>
    </>
  )
}
