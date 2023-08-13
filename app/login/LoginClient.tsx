"use client";

import Image from "next/image";
import Button from "../components/buttons/Button";
import { FcGoogle } from "react-icons/fc";
import useLoginModal from "../hooks/useLoginModal";
import useRegisterModal from "../hooks/useRegisterModal";
import Heading from "../components/Heading";
import { signIn } from "next-auth/react";

const LoginClient = () => {
  const loginModal = useLoginModal();
  const registerModal = useRegisterModal();
  return (
    <div className="bg-brand-lime z-40 w-screen h-screen flex flex-col justify-center items-center gap-40">
      <Image src="/images/logo.svg" alt="Logo" width="244" height="133" />
      <div className="flex flex-col gap-4 mx-4 w-[80%]">
        <Button
          rounded
          color="white"
          label="Log in"
          onClick={loginModal.onOpen}
        />
        <Button rounded label="Sign up" onClick={registerModal.onOpen} />
        <Button
          rounded
          color="white"
          label="Continue with Google"
          Icon={FcGoogle}
          onClick={() => signIn("google", { callbackUrl: "/" })}
        />
      </div>
    </div>
  );
};

export default LoginClient;
