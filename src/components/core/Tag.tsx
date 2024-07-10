import React, { ReactHTMLElement } from "react";
import { statusColors } from "@/utils";

interface Props
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  type: keyof typeof statusColors;
}

export const Tag = ({ type, ...rest }: Props) => {
  return (
    <div
      className={`rounded-xl w-fit p-2 px-3`}
      style={{
        backgroundColor: statusColors[type].bg,
        color: statusColors[type].color,
      }}
      {...rest}
    />
  );
};
