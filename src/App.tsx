import "./index.css";

import { ConnectKitButton } from 'connectkit'
import { useAccount } from 'wagmi'

import { Account } from './components'

export function App() {
  const { isConnected } = useAccount()
  return (
    <>
      <h1>wagmi + ConnectKit + Vite</h1>
      <ConnectKitButton />
      <h1 className="text-3xl font-bold underline text-rose-500">
        Hello world!
      </h1>
    </>
  )
}
