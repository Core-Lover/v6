import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { multiSendSchema, type MultiSendRequest } from '@shared/lab-schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Plus, Trash2 } from 'lucide-react';

interface SolanaMultiSendProps {
  network: 'mainnet' | 'testnet';
  walletAddress: string | null;
  onSubmit: (data: MultiSendRequest) => Promise<any>;
  isSubmitting: boolean;
}

export function SolanaMultiSend({ network, walletAddress, onSubmit, isSubmitting }: SolanaMultiSendProps) {
  const form = useForm<MultiSendRequest>({
    resolver: zodResolver(multiSendSchema),
    defaultValues: {
      chain: 'solana',
      network,
      tokenAddress: '',
      recipients: [{ address: '', amount: '' }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'recipients',
  });

  return (
    <Card data-testid="form-solana-multisend">
      <CardHeader>
        <CardTitle>Multi-Send</CardTitle>
        <CardDescription>Send tokens to multiple recipients in one transaction</CardDescription>
      </CardHeader>
      <CardContent>
        {!walletAddress ? (
          <p className="text-sm text-muted-foreground">Please connect your wallet to continue</p>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="tokenAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Address*</FormLabel>
                    <FormControl>
                      <Input placeholder="Token mint address" {...field} data-testid="input-token-address" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Recipients</h4>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => append({ address: '', amount: '' })}
                    data-testid="button-add-recipient"
                  >
                    <Plus className="mr-1 h-3 w-3" />
                    Add
                  </Button>
                </div>

                {fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2" data-testid={`recipient-${index}`}>
                    <FormField
                      control={form.control}
                      name={`recipients.${index}.address`}
                      render={({ field }) => (
                        <FormItem className="flex-1">
                          {index === 0 && <FormLabel>Address</FormLabel>}
                          <FormControl>
                            <Input
                              placeholder="Recipient address"
                              {...field}
                              data-testid={`input-recipient-address-${index}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name={`recipients.${index}.amount`}
                      render={({ field }) => (
                        <FormItem className="w-32">
                          {index === 0 && <FormLabel>Amount</FormLabel>}
                          <FormControl>
                            <Input
                              placeholder="100"
                              {...field}
                              data-testid={`input-recipient-amount-${index}`}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {fields.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className={index === 0 ? 'mt-8' : ''}
                        data-testid={`button-remove-recipient-${index}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting} data-testid="button-multisend">
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  `Send to ${fields.length} Recipient${fields.length > 1 ? 's' : ''}`
                )}
              </Button>
            </form>
          </Form>
        )}
      </CardContent>
    </Card>
  );
}
