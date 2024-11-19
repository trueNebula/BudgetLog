/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/require-default-props */
import { Button } from '@/components/ui/button';

const variants = {
  plus: '+',
  edit: '-',
  delete: 'x',
};

export default function RoundButton({
  variant,
  className,
  ...props
}: {
  variant: keyof typeof variants;
  className?: string;
}) {
  return (
    <Button type="button" variant="secondary" className={`rounded-full ${className}`} {...props}>
      {variants[variant]}
    </Button>
  );
}
