"use client";
import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { signIn } from "next-auth/react";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import Model from "./Model";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import useLoginModel from "@/app/hooks/useLoginModel";
import useRegisterModel from "@/app/hooks/useRegisterModel";
import { useRouter } from "next/navigation";
const LoginModel = () => {
  const registerModel = useRegisterModel();
  const LoginModel = useLoginModel();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    }).then((callback) => {
      setLoading(false);

      if (callback?.ok) {
        toast.success("Logged in");
        router.refresh();
        LoginModel.onClose();
      }

      if (callback?.error) {
        toast.error(callback.error);
      }
    });
  };
  const toggleModel = useCallback(() => {
    LoginModel.onClose();
    registerModel.onOpen();
  }, [LoginModel, registerModel]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="login to your account" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );

  const footerContent = (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => {}}
      />
      <Button
        outline
        label="Continue with Github"
        icon={AiFillGithub}
        onClick={() => {}}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <div className="flex flex-row items-center gap-2 justify-center">
          <div>First time creating account? </div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toggleModel}
          >
            signup
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Model
      open={LoginModel.open}
      disabled={isLoading}
      title="Login"
      actionLabel="Continue"
      onClose={LoginModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default LoginModel;
