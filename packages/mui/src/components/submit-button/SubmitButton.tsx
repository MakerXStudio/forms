import { Button } from '@mui/material';

export type SubmitButtonProps = {
  className?: string;
  label: string;
} & Parameters<typeof Button>[0];

export function SubmitButton({ className, label, ...rest }: SubmitButtonProps) {
  return (
    <Button variant="contained" type="submit" className={className} {...rest}>
      {label}
    </Button>
  );
}
