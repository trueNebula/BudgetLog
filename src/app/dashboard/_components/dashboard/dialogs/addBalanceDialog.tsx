import { useState } from 'react';
import Loader from '@/components/loader.tsx';
import RoundButton from '@/components/ui/roundButton';
import AddBalanceForm from '@/app/dashboard/_components/dashboard/forms/addBalanceForm';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function AddBalanceDialog() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const formSubmitCallback = () => {
    setLoading(true);
  };

  const formDoneCallback = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <RoundButton variant="plus" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className={`${loading && 'blur'}`}>
          <DialogTitle>Add new Balance</DialogTitle>
          <DialogDescription>
            Create a new balance into which you can add and remove money.
          </DialogDescription>
        </DialogHeader>
        <AddBalanceForm
          submitCallback={formSubmitCallback}
          doneCallback={formDoneCallback}
          loading={loading}
        />
        {loading && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <Loader />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
