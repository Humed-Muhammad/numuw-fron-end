import React from "react";
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Label } from "../ui/label";
import { FileUploader } from "../shared/FileUploader";
import { useFormikContext } from "formik";
import { ProductModel } from "@/utils/types";
import { Button } from "../ui/button";
import { X } from "lucide-react";

type Keys = keyof ProductModel;
export const ProductMedia = () => {
  const { setFieldValue, values } = useFormikContext<ProductModel>();

  return (
    <AccordionItem value="ProductMedia">
      <AccordionTrigger className="text-lg font-bold">
        Your Product Media
      </AccordionTrigger>
      <AccordionContent>
        <Label className="mb-3">Add all your product media hear...</Label>
        <div className="my-3">
          <div className="w-full flex items-center my-4 flex-wrap">
            {values.media?.length
              ? values.media?.map(
                  (media, currentIndex) =>
                    media && (
                      <div
                        key={currentIndex}
                        className="mx-2 w-auto relative shadow-sm  bg-white rounded-sm"
                      >
                        <div
                          style={{
                            backgroundImage: `url(${window.URL.createObjectURL(
                              media
                            )})`,
                          }}
                          className={`relative w-60 h-48 object-cover bg-center bg-no-repeat`}
                        ></div>
                        <Button
                          onClick={() => {
                            const filtered = values.media?.filter(
                              (_, index) => index !== currentIndex
                            );
                            setFieldValue("media", filtered);
                          }}
                          className="absolute top-0 right-0"
                          variant="outline"
                          size="icon"
                        >
                          <X />
                        </Button>
                      </div>
                    )
                )
              : null}
          </div>
          <FileUploader<Keys>
            name="media"
            multiple
            setFieldValue={setFieldValue}
            value={values.media}
          />
        </div>
      </AccordionContent>
    </AccordionItem>
  );
};
