import React from "react";
import { Tag } from "./Tag";

interface Props {
  value: boolean;
}

export const BooleanTag = ({ value }: Props) => {
  return <Tag type={value ? "success" : "error"}>{value ? "Yes" : "No"}</Tag>;
};
