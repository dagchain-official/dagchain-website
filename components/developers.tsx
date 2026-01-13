"use client"

import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Terminal, Code, Cpu, Database, Zap, GitBranch, Package, Rocket, ChevronRight, Play, Copy, Check, FileText, Settings, Monitor, Box, Github, Server, Hash } from "lucide-react"

export function Developers() {
  const [activeTab, setActiveTab] = useState(0)
  const [activeEndpoint, setActiveEndpoint] = useState(0)
  const [copied, setCopied] = useState<string | null>(null)

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/agents/register",
      description: "Register new AI agent",
      params: "{ name, capabilities, pricePerWord }",
      response: "{ agentId, address, status }"
    },
    {
      method: "POST", 
      endpoint: "/api/v1/provenance/stamp",
      description: "Create provenance stamp",
      params: "{ contentHash, metadata, creator }",
      response: "{ stampId, txHash, timestamp }"
    },
    {
      method: "POST",
      endpoint: "/api/v1/payments/stream",
      description: "Create payment stream",
      params: "{ recipient, rate, duration }",
      response: "{ streamId, status, totalAmount }"
    }
  ]

  const technicalSpecs = [
    {
      id: "evm",
      title: "EVM Compatibility Layer",
      icon: Cpu,
      badge: "PROTOCOL",
      specs: [
        { label: "Solidity Version", value: "^0.8.19", type: "version" },
        { label: "Gas Limit", value: "30M per block", type: "metric" },
        { label: "Block Time", value: "5 seconds", type: "metric" },
        { label: "Finality", value: "12 confirmations", type: "metric" }
      ],
      codeSnippet: `// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@DAGChain/contracts/DAGChainBase.sol";

contract AIMarketplace is DAGChainBase {
    struct Agent {
        address owner;
        string name;
        uint256 pricePerWord;
        uint256 reputation;
    }
    
    mapping(uint256 => Agent) public agents;
    uint256 public nextAgentId;
    
    function registerAgent(
        string memory _name,
        uint256 _pricePerWord
    ) external returns (uint256) {
        uint256 agentId = nextAgentId++;
        agents[agentId] = Agent({
            owner: msg.sender,
            name: _name,
            pricePerWord: _pricePerWord,
            reputation: 100
        });
        
        _registerAgent(msg.sender, _name);
        emit AgentRegistered(agentId, msg.sender, _name);
        return agentId;
    }
}`
    },
    {
      id: "sdk",
      title: "Multi-Language SDK",
      icon: Package,
      badge: "LIBRARY",
      specs: [
        { label: "Languages", value: "JS, Python, Rust", type: "list" },
        { label: "Bundle Size", value: "< 50KB gzipped", type: "metric" },
        { label: "API Coverage", value: "100% endpoints", type: "percentage" },
        { label: "TypeScript", value: "Full support", type: "feature" }
      ],
      codeSnippet: `import { DAGChainSDK, AgentConfig } from '@DAGChain/sdk';

// Initialize SDK
const DAGChain = new DAGChainSDK({
  network: 'testnet',
  apiKey: process.env.DAGChain_API_KEY,
  rpcUrl: 'https://testnet-rpc.DAGChain.dev'
});

// Agent Registration
const agentConfig: AgentConfig = {
  name: 'TranslationBot',
  capabilities: ['translation', 'nlp'],
  pricePerWord: 0.0005,
  metadata: {
    version: '1.0.0',
    model: 'gpt-4-turbo'
  }
};

const agent = await DAGChain.agents.register(agentConfig);
console.log('Agent ID:', agent.id);

// Provenance Stamping
const stamp = await DAGChain.provenance.stamp({
  contentHash: 'bafybeig6xv5nwphfmvcnektpnojts33jqcuam7bmye2pb54adnrtccjlsu',
  creator: '0x742d35Cc6634C0532925a3b8D',
  metadata: {
    tool: 'midjourney',
    prompt: 'cyberpunk city at night',
    model: 'v6'
  }
});

// Micro-payment Stream
const stream = await DAGChain.payments.createStream({
  recipient: agent.address,
  ratePerSecond: 0.0001,
  totalBudget: 1.0,
  conditions: {
    qualityThreshold: 8.5,
    maxLatency: 500
  }
});`
    },
    {
      id: "testnet",
      title: "Testnet Infrastructure",
      icon: Monitor,
      badge: "NETWORK",
      specs: [
        { label: "RPC Endpoint", value: "testnet-rpc.DAGChain.dev", type: "url" },
        { label: "Chain ID", value: "42069", type: "number" },
        { label: "Explorer", value: "testnet-scan.DAGChain.dev", type: "url" },
        { label: "Faucet Rate", value: "5 DGC/day", type: "metric" }
      ],
      codeSnippet: `#!/bin/bash
# DAGChain Testnet Setup Script

# Install DAGChain CLI
curl -fsSL https://install.DAGChain.dev | bash

# Configure network
DAGChain config set network testnet
DAGChain config set rpc-url https://testnet-rpc.DAGChain.dev
DAGChain config set chain-id 42069

# Generate wallet
DAGChain wallet create --name dev-wallet
export WALLET_ADDRESS=$(DAGChain wallet address dev-wallet)

# Request testnet tokens
DAGChain faucet request \\
  --address $WALLET_ADDRESS \\
  --amount 5

# Verify balance
DAGChain balance $WALLET_ADDRESS

# Deploy contract
DAGChain deploy contracts/MyAI.sol \\
  --network testnet \\
  --gas-limit 5000000 \\
  --constructor-args "MyAI" "1.0.0"

echo "✅ Testnet setup complete"
echo "🔗 Explorer: https://testnet-scan.DAGChain.dev/address/$WALLET_ADDRESS"`
    },
    {
      id: "primitives",
      title: "AI-Native Primitives",
      icon: Zap,
      badge: "PROTOCOL",
      specs: [
        { label: "Agent Registry", value: "On-chain identity", type: "feature" },
        { label: "Provenance", value: "IPFS + Arweave", type: "feature" },
        { label: "Micro-payments", value: "Sub-cent precision", type: "feature" },
        { label: "Throughput", value: "20K+ TPS", type: "metric" }
      ],
      codeSnippet: `from DAGChain import DAGChainSDK
import asyncio
from typing import Dict, Any

class AIAgentManager:
    def __init__(self, network: str = "testnet"):
        self.sdk = DAGChainSDK(network=network)
        self.agents: Dict[str, Any] = {}
    
    async def register_agent(
        self, 
        name: str, 
        capabilities: list,
        price_model: Dict[str, float]
    ) -> str:
        """Register AI agent with on-chain identity"""
        agent_config = {
            "name": name,
            "capabilities": capabilities,
            "pricing": price_model,
            "reputation_score": 100,
            "metadata": {
                "version": "1.0.0",
                "created_at": int(time.time())
            }
        }
        
        # Register on-chain
        tx_hash = await self.sdk.agents.register(agent_config)
        agent_id = await self.sdk.agents.get_id_from_tx(tx_hash)
        
        self.agents[agent_id] = agent_config
        return agent_id
    
    async def stamp_provenance(
        self,
        content_hash: str,
        creator: str,
        tool_metadata: Dict[str, Any]
    ) -> str:
        """Create immutable provenance record"""
        provenance_data = {
            "content_hash": content_hash,
            "creator": creator,
            "timestamp": int(time.time()),
            "tool_metadata": tool_metadata,
            "chain_id": 42069
        }
        
        # Store on IPFS + Arweave
        ipfs_hash = await self.sdk.storage.pin(provenance_data)
        arweave_tx = await self.sdk.storage.permanent_store(provenance_data)
        
        # Create on-chain stamp
        stamp_tx = await self.sdk.provenance.stamp({
            "ipfs_hash": ipfs_hash,
            "arweave_tx": arweave_tx,
            "content_hash": content_hash
        })
        
        return stamp_tx
    
    async def create_payment_stream(
        self,
        recipient: str,
        rate_per_unit: float,
        total_budget: float,
        conditions: Dict[str, Any]
    ) -> str:
        """Setup micro-payment stream for AI services"""
        stream_config = {
            "recipient": recipient,
            "rate_per_unit": rate_per_unit,
            "total_budget": total_budget,
            "conditions": conditions,
            "auto_refill": True,
            "quality_threshold": conditions.get("quality_threshold", 8.0)
        }
        
        stream_id = await self.sdk.payments.create_stream(stream_config)
        return stream_id

# Usage Example
async def main():
    manager = AIAgentManager()
    
    # Register translation agent
    agent_id = await manager.register_agent(
        name="GPT4Translator",
        capabilities=["translation", "summarization"],
        price_model={"per_word": 0.0005, "per_request": 0.01}
    )
    
    # Stamp AI-generated content
    stamp = await manager.stamp_provenance(
        content_hash="bafybeig6xv5nwphfmvcnektpnojts33jqcuam7bmye2pb54adnrtccjlsu",
        creator="0x742d35Cc6634C0532925a3b8D",
        tool_metadata={
            "model": "gpt-4-turbo",
            "prompt": "Translate this to Spanish",
            "confidence": 0.95
        }
    )
    
    print(f"Agent registered: {agent_id}")
    print(f"Provenance stamped: {stamp}")

if __name__ == "__main__":
    asyncio.run(main())`
    }
  ]

  return (
    <section id="developers" className="relative min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20">
      
      {/* Technical Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(107, 114, 128, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(107, 114, 128, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Technical Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          {/* API Status Bar */}
          <motion.div
            className="bg-white rounded-2xl p-4 mb-8 max-w-4xl mx-auto shadow-[12px_12px_24px_rgba(163,177,198,0.3),-12px_-12px_24px_rgba(255,255,255,0.9)] border border-gray-200"
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-between text-sm font-mono">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse" />
                  <span className="text-gray-700">API Status: Online</span>
                </div>
                <div className="flex items-center gap-2">
                  <Server className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Testnet: Under Active Development</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-gray-500">v1.0.0-beta</span>
                <div className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                  <div className="w-1 h-1 bg-gray-400 rounded-full" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.span
            className="inline-block px-6 py-2 bg-gray-100 rounded-full text-gray-700 text-sm font-mono tracking-wider mb-6 shadow-[4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)]"
            animate={{ 
              boxShadow: [
                "4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)",
                "8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)",
                "4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)"
              ]
            }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            DEVELOPER DOCUMENTATION
          </motion.span>
          
          <h2 className="text-5xl lg:text-7xl font-bold mb-6 font-mono bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent">
            API Reference
          </h2>
          
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed font-mono">
            Developer-first Layer 1 • EVM Compatible • AI-Native Primitives<br/>
            Complete SDK documentation and technical specifications
          </p>
        </motion.div>

        {/* API Endpoints Quick Reference */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <div className="bg-white rounded-2xl shadow-[16px_16px_32px_rgba(163,177,198,0.4),-16px_-16px_32px_rgba(255,255,255,0.9)] border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900 font-mono flex items-center gap-2">
                <Hash className="w-5 h-5" />
                API Endpoints
              </h2>
            </div>
            <div className="p-6">
              <div className="grid gap-4">
                {apiEndpoints.map((endpoint, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-gray-50 rounded-xl p-4 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs font-mono font-bold ${
                          endpoint.method === 'POST' ? 'bg-gray-100 text-gray-700' : 'bg-gray-200 text-gray-800'
                        }`}>
                          {endpoint.method}
                        </span>
                        <code className="text-sm font-mono text-gray-800">{endpoint.endpoint}</code>
                      </div>
                      <button
                        onClick={() => copyToClipboard(endpoint.endpoint, `endpoint-${index}`)}
                        className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                      >
                        {copied === `endpoint-${index}` ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{endpoint.description}</p>
                    <div className="flex gap-4 text-xs font-mono">
                      <span className="text-gray-500">Params: <code className="text-gray-700">{endpoint.params}</code></span>
                      <span className="text-gray-500">Returns: <code className="text-gray-800">{endpoint.response}</code></span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Technical Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {technicalSpecs.map((spec, index) => {
              const IconComponent = spec.icon
              return (
                <motion.button
                  key={spec.id}
                  onClick={() => setActiveTab(index)}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-mono text-sm transition-all duration-300 ${
                    activeTab === index
                      ? 'bg-white text-gray-900 shadow-[8px_8px_16px_rgba(163,177,198,0.4),-8px_-8px_16px_rgba(255,255,255,0.9)]'
                      : 'bg-gray-100 text-gray-600 hover:bg-white shadow-[4px_4px_8px_rgba(163,177,198,0.2),-4px_-4px_8px_rgba(255,255,255,0.8)] hover:shadow-[8px_8px_16px_rgba(163,177,198,0.3),-8px_-8px_16px_rgba(255,255,255,0.9)]'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="hidden sm:inline">{spec.title}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    activeTab === index ? 'bg-gray-200 text-gray-800' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {spec.badge}
                  </span>
                </motion.button>
              )
            })}
          </div>

          {/* Active Specification */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl shadow-[20px_20px_40px_rgba(163,177,198,0.4),-20px_-20px_40px_rgba(255,255,255,0.9)] border border-gray-200 overflow-hidden"
            >
              <div className="grid lg:grid-cols-2 gap-0">
                
                {/* Left: Specifications */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shadow-[inset_6px_6px_12px_rgba(163,177,198,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]">
                      {React.createElement(technicalSpecs[activeTab].icon, { className: "w-6 h-6 text-gray-700" })}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 font-mono">
                        {technicalSpecs[activeTab].title}
                      </h3>
                      <span className="text-sm text-gray-700 font-mono bg-gray-100 px-2 py-1 rounded">
                        {technicalSpecs[activeTab].badge}
                      </span>
                    </div>
                  </div>

                  {/* Technical Specs Grid */}
                  <div className="space-y-4">
                    {technicalSpecs[activeTab].specs.map((spec, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                        className="bg-gray-50 rounded-xl p-4 shadow-[inset_4px_4px_8px_rgba(163,177,198,0.2),inset_-4px_-4px_8px_rgba(255,255,255,0.8)]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600 font-mono text-sm">{spec.label}</span>
                          <code className={`font-mono text-sm font-bold ${
                            spec.type === 'version' ? 'text-gray-700' :
                            spec.type === 'metric' ? 'text-gray-800' :
                            spec.type === 'url' ? 'text-gray-700' :
                            spec.type === 'number' ? 'text-gray-800' :
                            'text-gray-800'
                          }`}>
                            {spec.value}
                          </code>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Right: Code Example */}
                <div className="bg-white p-0 border border-gray-200 rounded-lg shadow-lg">
                  <div className="bg-gray-100 px-4 py-3 flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-gray-400 rounded-full" />
                      <div className="w-3 h-3 bg-gray-500 rounded-full" />
                      <div className="w-3 h-3 bg-gray-600 rounded-full" />
                      <span className="ml-4 text-gray-700 font-mono text-sm">
                        {technicalSpecs[activeTab].id}.{
                          technicalSpecs[activeTab].id === 'evm' ? 'sol' :
                          technicalSpecs[activeTab].id === 'sdk' ? 'js' :
                          technicalSpecs[activeTab].id === 'testnet' ? 'sh' :
                          'py'
                        }
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(
                        technicalSpecs[activeTab].codeSnippet,
                        `spec-${activeTab}`
                      )}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      {copied === `spec-${activeTab}` ? (
                        <Check className="w-3 h-3" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      {copied === `spec-${activeTab}` ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="p-6 overflow-x-auto max-h-96 bg-gray-50">
                    <pre className="text-sm font-mono text-gray-800 leading-relaxed">
                      <code>{technicalSpecs[activeTab].codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* Developer Resources */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-2xl shadow-[16px_16px_32px_rgba(163,177,198,0.4),-16px_-16px_32px_rgba(255,255,255,0.9)] border border-gray-200 p-8 text-center"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Rocket className="w-8 h-8 text-gray-700" />
            <h3 className="text-2xl font-bold text-gray-900 font-mono">Developer Operating System</h3>
          </div>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed font-mono mb-8">
            Complete EVM compatibility + AI-native primitives + Multi-language SDKs<br/>
            Build, test, and scale in the AI economy with full technical control
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <div className="bg-gray-50 rounded-xl p-6 shadow-[inset_6px_6px_12px_rgba(163,177,198,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]">
              <Code className="w-8 h-8 text-gray-700 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 font-mono mb-2">Solidity Engineers</h4>
              <p className="text-sm text-gray-600 font-mono">Deploy existing contracts instantly</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-[inset_6px_6px_12px_rgba(163,177,198,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]">
              <Zap className="w-8 h-8 text-gray-700 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 font-mono mb-2">AI Researchers</h4>
              <p className="text-sm text-gray-600 font-mono">Protocol-native AI primitives</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 shadow-[inset_6px_6px_12px_rgba(163,177,198,0.2),inset_-6px_-6px_12px_rgba(255,255,255,0.8)]">
              <Package className="w-8 h-8 text-gray-700 mx-auto mb-3" />
              <h4 className="font-bold text-gray-900 font-mono mb-2">No-Code Creators</h4>
              <p className="text-sm text-gray-600 font-mono">SDK abstractions and integrations</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
