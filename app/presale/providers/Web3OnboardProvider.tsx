"use client"

import Onboard from '@web3-onboard/core'
import injectedModule from '@web3-onboard/injected-wallets'

const injected = injectedModule()

const chains = [
  {
    id: '0x1',
    token: 'ETH',
    label: 'Ethereum Mainnet',
    rpcUrl: 'https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
  },
  {
    id: '0xaa36a7',
    token: 'ETH',
    label: 'Sepolia Testnet',
    rpcUrl: 'https://sepolia.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
  },
  {
    id: '0x5',
    token: 'ETH',
    label: 'Goerli Testnet',
    rpcUrl: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
  }
]

const appMetadata = {
  name: 'DAGChain Presale',
  icon: '/assets/logonew.png',
  description: 'DAGChain Token Sale Platform',
  recommendedInjectedWallets: [
    { name: 'MetaMask', url: 'https://metamask.io' },
    { name: 'Coinbase', url: 'https://wallet.coinbase.com/' },
    { name: 'Trust', url: 'https://trustwallet.com/' }
  ]
}

export const onboard = Onboard({
  wallets: [injected],
  chains,
  appMetadata,
  accountCenter: {
    desktop: {
      enabled: false
    },
    mobile: {
      enabled: false
    }
  },
  connect: {
    autoConnectLastWallet: true
  }
})

console.log('Web3Onboard initialized:', onboard)
