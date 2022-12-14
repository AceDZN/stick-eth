import React, { useState } from 'react'
import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'
import { Account } from '.'


export { ConnectWalletButton }

function ConnectWalletButton() {
  const { isConnected } = useAccount()

  return (
    <>
      <h1 className="text-3xl font-bold underline blue">
        Hello world!
      </h1>
      <ConnectKitButton />
      {isConnected && <Account />}
    </>
  )
}
