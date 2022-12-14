import { getDefaultClient } from 'connectkit'
import { createClient } from 'wagmi'
console.log({
  autoConnect: true,
  appName: 'My wagmi + ConnectKit App',
  alchemyId: import.meta.env.VITE_ALCHEMY_API_KEY!,
  infuraId: import.meta.env.VITE_INFURA_API_KEY!,
})
export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: 'My wagmi + ConnectKit App',
    alchemyId: import.meta.env.VITE_ALCHEMY_API_KEY!,
    infuraId: import.meta.env.VITE_INFURA_API_KEY!,
  })
)
