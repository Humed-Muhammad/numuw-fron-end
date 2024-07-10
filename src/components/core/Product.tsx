import React from "react";
import { Formik } from "formik";
import { Accordion } from "@/components/ui/accordion";
import { ProductGeneralInfoInput } from "@/components/core/ProductGeneralInfoInput";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { productInitialValue } from "@/app/root/products/constant";
import { productFormValidation } from "@/utils/productFormValidation";
import { Organize } from "@/components/core/Organize";

import { LoadingCircle } from "@/components/shared/icons";
import { ProductModel } from "@/utils/types";
import { FormikObserver } from "./FormikObserver";
import { SWRMutationResponse } from "swr/mutation";
import { RecordModel } from "pocketbase";
import { Thumbnail } from "./Thumbnail";
import { ProductMedia } from "./ProductMedia";

interface Props
  extends SWRMutationResponse<RecordModel, any, string, ProductModel> {
  product?: ProductModel;
  title: string;
}
export const Product = ({ product, title, trigger, isMutating }: Props) => {
  return (
    <Formik
      initialValues={productInitialValue}
      onSubmit={(values) => trigger(values)}
      validationSchema={productFormValidation}
    >
      {({ handleSubmit }) => (
        <div className="h-full overflow-y-auto flex flex-col items-center p-5 pb-10 flex-grow">
          <Card className="mb-10 text-2xl rounded-none w-full h-16 py-5 border-none flex items-center justify-between px-10">
            <Label>{title}</Label>
            <Button disabled={isMutating} onClick={() => handleSubmit()}>
              {isMutating ? (
                <>
                  <LoadingCircle /> Saving...
                </>
              ) : (
                "Save"
              )}
            </Button>
          </Card>
          <FormikObserver data={product} />
          <Accordion
            defaultValue={["item-1"]}
            type="multiple"
            className="w-full lg:w-3/4 2xl:w-1/2"
          >
            <ProductGeneralInfoInput />
            <Organize />
            <Thumbnail />
            <ProductMedia />
          </Accordion>
        </div>
      )}
    </Formik>
  );
};
