import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Container } from "@/components/core/Container";
import { AlertMessage } from "@/components/core/AlertMessage";
import { Formik } from "formik";
import { LoadingDots } from "@/components/shared/icons";
import { loginValidation } from "./validation";
import { FormikError } from "@/components/core/FormikError";
import { IconX } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useSnapMutation } from "snap-fetch";
import type { LoginResponse } from "../types";

export default function Login() {
  const push = useNavigate();
  const { mutate, isLoading, error, isError } =
    useSnapMutation<LoginResponse>("login/");
  return (
    <Container className="bg-gray-50 h-screen">
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          mutate(values).then((res) => {
            localStorage.setItem("user", JSON.stringify(res));
            push("/");
          });
        }}
        validationSchema={loginValidation}
      >
        {({ handleSubmit, handleChange }) => (
          <Card className="w-full md:w-[450px] p-5">
            <>
              {isError && (
                <AlertMessage
                  className="w-full"
                  Icon={<IconX className="h-4 w-4" />}
                  title="Error"
                  message={
                    error?.message ??
                    "Something went wrong, please try again later."
                  }
                />
              )}
            </>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login to your account</CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      id="email"
                      placeholder="Email"
                      onChange={handleChange}
                    />
                    <FormikError name="email" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="framework">Password</Label>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Password"
                      onChange={handleChange}
                    />
                    <FormikError name="password" />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                disabled={isLoading}
                onClick={() => handleSubmit()}
                className="w-full"
              >
                {isLoading ? <LoadingDots color="white" /> : "Login"}
              </Button>
            </CardFooter>
          </Card>
        )}
      </Formik>
      <Card className="absolute right-10 top-2 flex-col flex p-10 space-y-2">
        <Label className="text-xl">Example Parent</Label>
        <Label>Email: fatima@gmail.com</Label>
        <Label>Password: 1234567</Label>
        <Label className="text-xl mt-4">Example Therapist</Label>
        <Label>Email: bob@gmail.com</Label>
        <Label>Password: 1234567</Label>
      </Card>
    </Container>
  );
}
