import React, { useRef } from "react";
import { FileArchive } from "lucide-react";
import { useFormikContext } from "formik";
import { ProductModel, SetFieldValue } from "@/utils/types";

interface Props<K> {
  name: K;
  setFieldValue: SetFieldValue;
  multiple?: boolean;
  value?: Array<File | undefined>;
}
export const FileUploader = <K extends string>({
  name,
  setFieldValue,
  multiple,
  value,
}: Props<K>) => {
  const selectorRef = useRef<HTMLInputElement>(null);
  return (
    <div
      onClick={() => selectorRef.current?.click()}
      className="border-2 border-dashed border-gray-400 hover:border-purple-400 cursor-pointer h-28 w-full flex flex-col justify-center items-center rounded-md"
    >
      <FileArchive />
      <p className="text-gray-500 text-center my-2">Drag and drop files here</p>
      <p className="text-gray-500 text-center">Limit is 10mb</p>
      <input
        ref={selectorRef}
        multiple={multiple}
        className="hidden"
        type="file"
        name={name}
        accept="images/*"
        onChange={(e) => {
          if (e.target.files?.length) {
            if (multiple) {
              const files = Array.from(e.target.files);
              if (value?.length) {
                setFieldValue(name, [...value, ...files]);
              } else {
                setFieldValue(name, files);
              }
            } else {
              setFieldValue(name, e.target.files?.[0]);
            }
          }
        }}
      />
    </div>
  );
};
