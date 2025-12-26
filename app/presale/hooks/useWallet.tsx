"use client"

import { useConnectWallet } from '@web3-onboard/react'
import { ethers } from 'ethers'
import { useState, useEffect } from 'react'

export function useWallet() {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet()
  const [balance, setBalance] = useState<string>('0')
  const [error, setError] = useState<string | null>(null)

  // Get account address
  const account = wallet?.accounts[0]?.address || null
  const chainId = wallet?.chains[0]?.id ? parseInt(wallet.chains[0].id, 16) : null

  // Fetch balance when account changes
  useEffect(() => {
    if (account && wallet?.provider) {
      fetchBalance()
    }
  }, [account, wallet?.provider])

  const fetchBalance = async () => {
    if (!account || !wallet?.provider) return
    
    try {
      const ethersProvider = new ethers.providers.Web3Provider(wallet.provider, 'any')
      const balance = await ethersProvider.getBalance(account)
      setBalance(ethers.utils.formatEther(balance))
    } catch (err) {
      console.error('Error fetching balance:', err)
    }
  }

  const connectWallet = async () => {
    setError(null)
    try {
      await connect()
    } catch (err: any) {
      console.error('Error connecting wallet:', err)
      setError(err.message || 'Failed to connect wallet')
    }
  }

  const disconnectWallet = async () => {
    if (wallet) {
      await disconnect(wallet)
    }
    setBalance('0')
    setError(null)
  }

  const formatAddress = (address: string) => {
    if (!address) return ''
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getProvider = () => {
    if (!wallet?.provider) return null
    return new ethers.providers.Web3Provider(wallet.provider, 'any')
  }

  const getSigner = () => {
    const provider = getProvider()
    return provider?.getSigner() || null
  }

  return {
    account,
    provider: getProvider(),
    signer: getSigner(),
    isConnecting: connecting,
    error,
    chainId,
    balance,
    connectWallet,
    disconnectWallet,
    formatAddress,
    isConnected: !!account,
  }
}
