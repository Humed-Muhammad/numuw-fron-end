import { ErrorMessage, ErrorMessageProps } from "formik";

import { Label } from "../ui/label";

interface Props<T extends string> extends ErrorMessageProps {
  name: T;
}

export const FormikError = <T extends string>(props: Props<T>) => {
  return (
    <ErrorMessage {...props}>
      {(msg) => <Label className="w-full text-red-500">{msg}</Label>}
    </ErrorMessage>
  );
};
