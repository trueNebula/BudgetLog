import AddBalanceForm from '@/app/dashboard/_components/dashboard/forms/addBalanceForm';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function AddBalanceDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" variant="secondary" className="rounded-full">
          +
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add new Balance</DialogTitle>
          <DialogDescription>
            Create a new balance into which you can add and remove money.
          </DialogDescription>
        </DialogHeader>
        <AddBalanceForm />
      </DialogContent>
    </Dialog>
  );
}
