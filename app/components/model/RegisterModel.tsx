"use client";
import axios from "axios";
import { useCallback, useState } from "react";
import { AiFillGithub } from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import useRegisterModel from "@/app/hooks/useRegisterModel";
import Model from "./Model";
import Heading from "../Heading";
import Input from "../inputs/Input";
import toast from "react-hot-toast";
import Button from "../Button";
import LoginModel from "./LoginModel";
import useLoginModel from "@/app/hooks/useLoginModel";
const RegisterModel = () => {
  const registerModel = useRegisterModel();
  const LoginModel = useLoginModel();
  const [isLoading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    axios
      .post("/api/register", data)
      .then(() => {
        registerModel.onClose();
      })
      .catch((error) => {
        toast.error(`Something went wrong`, error);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  const toggleModel = useCallback(() => {
    LoginModel.onOpen();
    registerModel.onClose();
  }, [LoginModel, registerModel]);
  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome to Airbnb" subtitle="Create an account" />
      <Input
        id="name"
        label="name"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
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
          <div>Already have account ? </div>
          <div
            className="text-neutral-800 cursor-pointer hover:underline"
            onClick={toggleModel}
          >
            Login
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Model
      open={registerModel.open}
      disabled={isLoading}
      title="Register"
      actionLabel="Continue"
      onClose={registerModel.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModel;
