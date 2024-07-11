import type { ReactNode, RefObject } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  ref?: RefObject<HTMLDivElement>;
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
