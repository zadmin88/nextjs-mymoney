"use client";

import { useCallback, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";
import { AiFillGithub } from "react-icons/ai";
import { useRouter } from "next/navigation";

import useLoginModal from "@/app/hooks/useLoginModal";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "./Modal";
import Heading from "../Heading";
import Input from "../inputs/Input";
import Button from "../buttons/Button";
import { signIn } from "next-auth/react";

const RegisterModal = () => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      nombre: "",
      email: "",
      password: "",
    },
  });

  const onClose = useCallback(() => {
    registerModal.onClose();
    reset();
  }, [registerModal, reset]);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);

    axios
      .post("/api/register", data)
      .then(() => {
        toast.success("Account created!");
        signIn("credentials", {
          ...data,
          redirect: false,
        }).then((callback) => {
          setIsLoading(false);

          if (callback?.ok) {
            toast.success("Logged in");
            router.push("/");
            registerModal.onClose();
            reset();
          }

          if (callback?.error) {
            toast.error(callback.error);
          }
        });
      })
      .catch((error) => {
        toast.error("Account already exist");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const onToggle = useCallback(() => {
    registerModal.onClose();
    loginModal.onOpen();
  }, [loginModal, registerModal]);

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Registrate" subtitle="Signup to continue" />
      <Input
        id="name"
        label="Name"
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
        label="Password"
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
      {/* <Button
        
        label='Continue with Google'
        icon={FcGoogle}
        // onClick={() => signIn('google')}
        onClick={() => {}}
        /> */}

      <div
        className="
      text-neutral-500 text-center mt-4 font-light"
      >
        <p>
          Do you have an account?
          <span
            onClick={onToggle}
            className="
              text-neutral-800
              cursor-pointer 
              hover:underline
            "
          >
            {" "}
            Log in
          </span>
        </p>
      </div>
    </div>
  );

  return (
    <Modal
      color="lime"
      disabled={isLoading}
      isOpen={registerModal.isOpen}
      actionLabel="Crear cuenta"
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
      footer={footerContent}
    />
  );
};

export default RegisterModal;
