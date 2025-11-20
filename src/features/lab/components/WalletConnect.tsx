import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Wallet, Power, Loader2 } from 'lucide-react';
import { truncateAddress } from '@/lib/utils';
import type { Chain } from '@shared/lab-schema';

interface WalletConnectProps {
  chain: Chain;
  connected: boolean;
  connecting: boolean;
  address: string | null;
  onConnect: () => void;
  onDisconnect: () => void;
}

export function WalletConnect({
  chain,
  connected,
  connecting,
  address,
  onConnect,
  onDisconnect,
}: WalletConnectProps) {
  return (
    <div className="flex items-center gap-2">
      <Badge variant="secondary" className="hidden sm:flex" data-testid="badge-testnet-mode">
        Testnet Mode
      </Badge>

      {connected && address ? (
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="font-mono" data-testid="badge-wallet-address">
            {truncateAddress(address)}
          </Badge>
          <Button
            size="icon"
            variant="outline"
            onClick={onDisconnect}
            data-testid="button-disconnect-wallet"
          >
            <Power className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <Button
          onClick={onConnect}
          disabled={connecting}
          data-testid="button-connect-wallet"
        >
          {connecting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <Wallet className="mr-2 h-4 w-4" />
              Connect {chain === 'solana' ? 'Phantom' : 'MetaMask'}
            </>
          )}
        </Button>
      )}
    </div>
  );
}
