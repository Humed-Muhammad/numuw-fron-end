import { useFormikContext } from "formik";
import React, { useEffect } from "react";

interface Props<T> {
  data: T;
}
export const FormikObserver = <T,>({ data }: Props<T>) => {
  const { setValues } = useFormikContext<T>();
  useEffect(() => {
    if (data) {
      setValues(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data)]);
  return <div />;
};
