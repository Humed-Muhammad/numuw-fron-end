import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}
export const Container = ({ children, className }: Props) => {
  return (
    <div
      className={`flex items-center justify-center w-full h-full ${className}`}
    >
      {children}
    </div>
  );
};
