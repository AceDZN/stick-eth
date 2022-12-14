import React, { useState } from 'react'
import { useElementSize } from 'usehooks-ts'
import { useAccount } from 'wagmi'
import { AppMenu } from '../../components/AppMenu'
import CanvasApp from '../../components/CanvasApp'
import { AppStateProvider } from '../../hooks/useAppStateContext'
import { CanvasProvider } from '../../hooks/useCanvasContext'
import { StickersProvider } from '../../hooks/useStickersContext'
import './code.css'

export { Page }
const MAX_SIZE = 630
function Page() {
  const [squareRef, { width, height }] = useElementSize()
  let size = (width > 0 && height > 0) ? (width <= height ? width : height) : width;
  size = size < MAX_SIZE ? size : MAX_SIZE;
  //const { isConnected } = useAccount()
  return (
    <>
      <CanvasProvider>
        <AppStateProvider>
          <StickersProvider>
            <main className='grid gap-4 lg:grid-cols-2 content-center justify-center'>
              <section className='p-5 w'>
                <div ref={squareRef}>
                  <CanvasApp width={size} height={size}/>
                </div>
              </section>
              <div className=''>
                <AppMenu />
              </div>

            </main>
          </StickersProvider>
        </AppStateProvider>
      </CanvasProvider>
    </>
  )
}
