/* eslint-disable react/jsx-props-no-spreading */
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form, FormControl, FormField, FormItem, FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { api } from '@/trcp/react.tsx';

const balanceSchema = z.object({
  name: z.string().min(1, 'Required'),
  amount: z.number(),
  currency: z.string().min(1, 'Required'),
});

export default function AddBalanceForm({
  submitCallback,
  doneCallback,
  loading,
}: {
  submitCallback: () => void;
  doneCallback: () => void;
  loading: boolean;
}) {
  const form = useForm<z.infer<typeof balanceSchema>>({
    resolver: zodResolver(balanceSchema),
    defaultValues: {
      name: '',
      amount: 0,
      currency: '',
    },
  });

  const utils = api.useUtils();
  const { mutate } = api.balances.addBalance.useMutation({
    onSuccess: async () => {
      await utils.balances.getBalances.refetch();
      form.reset();
      submitCallback();
    },
  });
  const handleSubmit = async (values: z.infer<typeof balanceSchema>) => {
    doneCallback();
    mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className={`flex flex-col gap-6 ${loading && 'blur'}`}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name<span className="text-red-700">*</span>
              </FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Starting Value<span className="text-red-700">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  type="number"
                  value={field.value ?? ''}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Currency<span className="text-red-700">*</span>
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue="field.value">
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a currency" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="$">USD</SelectItem>
                  <SelectItem value="€">EUR</SelectItem>
                  <SelectItem value="£">GBP</SelectItem>
                  <SelectItem value="¥">JP¥</SelectItem>
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <div className="self-end">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
