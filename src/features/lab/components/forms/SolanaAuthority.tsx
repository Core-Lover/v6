import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { manageAuthoritySchema, type ManageAuthorityRequest } from '@shared/lab-schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';

interface SolanaAuthorityProps {
  network: 'mainnet' | 'testnet';
  walletAddress: string | null;
  onSubmit: (data: ManageAuthorityRequest) => Promise<any>;
  isSubmitting: boolean;
}

export function SolanaAuthority({ network, walletAddress, onSubmit, isSubmitting }: SolanaAuthorityProps) {
  const form = useForm<ManageAuthorityRequest>({
    resolver: zodResolver(manageAuthoritySchema),
    defaultValues: {
      chain: 'solana',
      network,
      mintAddress: '',
      authorityType: 'mint',
      newAuthority: '',
    },
  });

  return (
    <Card data-testid="form-solana-authority">
      <CardHeader>
        <CardTitle>Manage Authority</CardTitle>
        <CardDescription>Transfer or revoke token authorities</CardDescription>
      </CardHeader>
      <CardContent>
        {!walletAddress ? (
          <p className="text-sm text-muted-foreground">Please connect your wallet to continue</p>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="mintAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mint Address*</FormLabel>
                    <FormControl>
                      <Input placeholder="Token mint address" {...field} data-testid="input-mint-address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="authorityType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Authority Type*</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger data-testid="select-authority-type">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="mint">Mint Authority</SelectItem>
                        <SelectItem value="freeze">Freeze Authority</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="newAuthority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>New Authority Address (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Leave empty to revoke authority"
                        {...field}
                        data-testid="input-new-authority"
                      />
                    </FormControl>
                    <FormDescription>
                      Leave empty to permanently revoke this authority
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-update-authority">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  'Update Authority'
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
