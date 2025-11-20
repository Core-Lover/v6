import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Coins,
  Plus,
  Snowflake,
  Key,
  Send,
  Flame,
  PauseCircle,
  Check,
} from 'lucide-react';
import type { Chain } from '@shared/lab-schema';

interface ChainLandingProps {
  chain: Chain;
}

const chainData = {
  solana: {
    name: 'Solana',
    logo: '/logos/solana.jpg',
    description: 'Solana is a high-performance blockchain supporting builders around the world creating crypto apps that scale. Built for mass adoption with fast transaction speeds and low fees.',
    features: [
      {
        id: 'create-token',
        icon: Coins,
        title: 'Create SPL Token',
        description: 'Deploy a new SPL token on Solana testnet with custom metadata, supply, and decimals.',
      },
      {
        id: 'mint',
        icon: Plus,
        title: 'Mint Tokens',
        description: 'Mint additional tokens to any wallet address. Requires mint authority.',
      },
      {
        id: 'freeze',
        icon: Snowflake,
        title: 'Freeze Account',
        description: 'Freeze or unfreeze token accounts to prevent transfers. Requires freeze authority.',
      },
      {
        id: 'authority',
        icon: Key,
        title: 'Manage Authority',
        description: 'Transfer or revoke mint, freeze, and update authorities for your token.',
      },
      {
        id: 'multisend',
        icon: Send,
        title: 'Multi-Send',
        description: 'Send tokens to multiple addresses in a single transaction, saving time and fees.',
      },
    ],
    howToUse: [
      'Select a tool from the navigation bar above',
      'Connect your Phantom or Solflare wallet',
      'Fill in the required details for your operation',
      'Review and confirm the transaction',
      'Monitor the transaction status in real-time',
    ],
  },
  ethereum: {
    name: 'Ethereum',
    logo: '/logos/ethereum.jpg',
    description: 'Ethereum is the community-run technology powering the cryptocurrency ether (ETH) and thousands of decentralized applications. The most widely used blockchain for smart contracts.',
    features: [
      {
        id: 'create-token',
        icon: Coins,
        title: 'Create ERC-20 Token',
        description: 'Generate and deploy a new ERC-20 token contract with customizable features.',
      },
      {
        id: 'mint',
        icon: Plus,
        title: 'Mint Tokens',
        description: 'Mint new tokens to specified addresses. Available for mintable token contracts.',
      },
      {
        id: 'burn',
        icon: Flame,
        title: 'Burn Tokens',
        description: 'Permanently remove tokens from circulation by burning them.',
      },
      {
        id: 'pause',
        icon: PauseCircle,
        title: 'Pause/Unpause',
        description: 'Pause all token transfers during emergencies or maintenance periods.',
      },
      {
        id: 'approve',
        icon: Check,
        title: 'Approve Spending',
        description: 'Grant allowance for another address to spend tokens on your behalf.',
      },
      {
        id: 'multisend',
        icon: Send,
        title: 'Multi-Send',
        description: 'Batch send tokens to multiple addresses efficiently in one transaction.',
      },
    ],
    howToUse: [
      'Select a tool from the navigation bar above',
      'Connect your MetaMask or WalletConnect wallet',
      'Ensure you have enough ETH for gas fees',
      'Fill in the required parameters',
      'Sign and submit the transaction',
      'Wait for blockchain confirmation',
    ],
  },
  bsc: {
    name: 'BNB Smart Chain',
    logo: '/logos/bsc.jpg',
    description: 'BNB Smart Chain (BSC) is a blockchain network built for running smart contract-based applications. Fast, affordable, and EVM-compatible with cross-chain interoperability.',
    features: [
      {
        id: 'create-token',
        icon: Coins,
        title: 'Create BEP-20 Token',
        description: 'Generate and deploy BEP-20 token contracts on BSC with low gas fees.',
      },
      {
        id: 'mint',
        icon: Plus,
        title: 'Mint Tokens',
        description: 'Mint additional tokens to wallet addresses. Lower fees than Ethereum.',
      },
      {
        id: 'burn',
        icon: Flame,
        title: 'Burn Tokens',
        description: 'Reduce token supply by burning tokens permanently.',
      },
      {
        id: 'pause',
        icon: PauseCircle,
        title: 'Pause/Unpause',
        description: 'Control token transfers with pause functionality for security.',
      },
      {
        id: 'approve',
        icon: Check,
        title: 'Approve Spending',
        description: 'Set spending allowances for smart contracts or addresses.',
      },
      {
        id: 'multisend',
        icon: Send,
        title: 'Multi-Send',
        description: 'Distribute tokens to multiple wallets in one cost-effective transaction.',
      },
    ],
    howToUse: [
      'Select a tool from the navigation bar above',
      'Connect your MetaMask wallet and switch to BSC network',
      'Ensure you have BNB for transaction fees',
      'Configure your token operation parameters',
      'Review and confirm the transaction',
      'Track status on BSCScan',
    ],
  },
};

export function ChainLanding({ chain }: ChainLandingProps) {
  const data = chainData[chain];

  return (
    <div className="space-y-6">
      {/* Chain Header */}
      <div className="flex flex-col md:flex-row items-center gap-6 p-6 bg-gradient-to-r from-[#1a1f2e] to-[#0E1116] rounded-lg border border-[#FFA500]/20">
        <div className="w-24 h-24 rounded-full bg-background p-4 flex items-center justify-center overflow-hidden">
          <img src={data.logo} alt={`${data.name} logo`} className="w-full h-full object-contain" />
        </div>
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-3xl font-bold text-[#FFA500] mb-2">{data.name}</h2>
          <p className="text-muted-foreground">{data.description}</p>
        </div>
      </div>

      {/* Features Grid */}
      <div>
        <h3 className="text-xl font-semibold mb-4 text-white">Available Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.id} className="bg-card/50 border-border hover:border-[#FFA500]/50 transition-colors">
                <CardHeader>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="p-2 bg-[#FFA500]/10 rounded-lg">
                      <Icon className="w-5 h-5 text-[#FFA500]" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </div>

      {/* How to Use Section */}
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle className="text-xl text-white">How to Use Lab Features</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3">
            {data.howToUse.map((step, index) => (
              <li key={index} className="flex items-start gap-3">
                <Badge variant="outline" className="min-w-[2rem] h-8 flex items-center justify-center bg-[#FFA500]/10 text-[#FFA500] border-[#FFA500]/30">
                  {index + 1}
                </Badge>
                <p className="text-muted-foreground pt-1">{step}</p>
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>

      {/* Quick Start */}
      <div className="p-4 bg-[#FFA500]/5 border border-[#FFA500]/20 rounded-lg">
        <p className="text-sm text-muted-foreground">
          <strong className="text-[#FFA500]">Quick Start:</strong> Select any tool from the navigation bar above to get started. 
          You'll be guided through each step with clear instructions and real-time transaction tracking.
        </p>
      </div>
    </div>
  );
}
