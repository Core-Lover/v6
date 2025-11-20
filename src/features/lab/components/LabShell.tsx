import { useState } from 'react';
import { ChainTabs } from './ChainTabs';
import { WalletConnect } from './WalletConnect';
import { ToolSidebar } from './ToolSidebar';
import { TransactionStatus } from './TransactionStatus';
import { ChainLanding } from './ChainLanding';
import { useSolanaWallet } from '../hooks/useSolanaWallet';
import { useEvmWallet } from '../hooks/useEvmWallet';
import { useSolanaOperations } from '../hooks/useSolanaOperations';
import { useEvmOperations } from '../hooks/useEvmOperations';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import type { Chain } from '@shared/lab-schema';

interface LabShellProps {
  children: (props: {
    chain: Chain;
    selectedTool: string | null;
    solanaWallet: ReturnType<typeof useSolanaWallet>;
    evmWallet: ReturnType<typeof useEvmWallet>;
    solanaOps: ReturnType<typeof useSolanaOperations>;
    evmOps: ReturnType<typeof useEvmOperations>;
  }) => React.ReactNode;
}

export function LabShell({ children }: LabShellProps) {
  const [selectedChain, setSelectedChain] = useState<Chain>('solana');
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const solanaWallet = useSolanaWallet();
  const evmChain: 'ethereum' | 'bsc' = selectedChain === 'bsc' ? 'bsc' : 'ethereum';
  const evmWallet = useEvmWallet(evmChain);
  const solanaOps = useSolanaOperations(solanaWallet.connection);
  const evmOps = useEvmOperations(evmWallet.provider, evmWallet.chain, evmWallet.network);

  const handleChainChange = (chain: Chain) => {
    setSelectedChain(chain);
    setSelectedTool(null);
    if (chain !== 'solana') {
      evmWallet.switchChain(chain === 'bsc' ? 'bsc' : 'ethereum').catch(console.error);
    }
  };

  const currentWallet = selectedChain === 'solana' ? solanaWallet : evmWallet;
  const currentOps = selectedChain === 'solana' ? solanaOps : evmOps;

  return (
    <div className="flex flex-col h-screen bg-[#0E1116]" data-testid="lab-shell">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="md:hidden"
                data-testid="button-toggle-sidebar"
              >
                {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
              </Button>
              <h1 className="text-2xl font-bold text-[#FFA500]">EthicX Lab</h1>
            </div>
            <WalletConnect
              chain={selectedChain}
              connected={currentWallet.connected}
              connecting={currentWallet.connecting}
              address={currentWallet.address}
              onConnect={currentWallet.connect}
              onDisconnect={currentWallet.disconnect}
            />
          </div>
          <ChainTabs selectedChain={selectedChain} onChainChange={handleChainChange} />
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden relative">
        <aside 
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform duration-300 ease-in-out absolute md:relative z-10 w-64 h-full border-r border-border bg-card md:translate-x-0`}
        >
          <div className="flex items-center justify-between p-4 border-b border-border md:hidden">
            <h3 className="font-semibold">Tools</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(false)}
              data-testid="button-close-sidebar"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ToolSidebar
            chain={selectedChain}
            selectedTool={selectedTool}
            onToolSelect={(tool) => {
              setSelectedTool(tool);
              if (window.innerWidth < 768) {
                setSidebarOpen(false);
              }
            }}
          />
        </aside>

        <main className="flex-1 overflow-auto">
          <div className="w-full max-w-5xl mx-auto px-4 py-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className={`${sidebarOpen ? 'hidden' : 'flex'} mb-4 md:hidden items-center gap-2`}
              data-testid="button-open-sidebar"
            >
              <Menu className="h-4 w-4" />
              Show Tools
            </Button>
            {selectedTool === null ? (
              <ChainLanding chain={selectedChain} />
            ) : (
              children({
                chain: selectedChain,
                selectedTool,
                solanaWallet,
                evmWallet,
                solanaOps,
                evmOps,
              })
            )}
          </div>
        </main>
      </div>

      <TransactionStatus
        status={currentOps.txStatus}
        onClose={currentOps.resetStatus}
      />
    </div>
  );
}
