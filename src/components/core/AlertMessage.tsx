import { ComponentProps, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

interface Props extends ComponentProps<typeof Alert> {
  message: string | undefined;
  title: string | undefined;
  Icon?: ReactNode;
}
export const AlertMessage = ({
  message,
  title,
  Icon,
  className,
  ...rest
}: Props) => {
  return (
    <Alert
      variant="destructive"
      className={`bg-red-50 border-0 w-full my-1 ${className}`}
      {...rest}
    >
      {Icon}
      <AlertTitle>{title}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};
