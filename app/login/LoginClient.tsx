'use client';

import Image from 'next/image';
import Button from '../components/buttons/Button';
import { FcGoogle } from 'react-icons/fc';
import useLoginModal from '../hooks/useLoginModal';
import useRegisterModal from '../hooks/useRegisterModal copy';
import Heading from '../components/Heading';
import { signIn } from 'next-auth/react';

const LoginClient = () => {
  const loginModal = useLoginModal()
  const registerModal = useRegisterModal()
  return (
    <div className='bg-brand-lime w-screen h-screen flex flex-col justify-center items-center gap-40'>
      
      <Image src='/images/logo.svg' alt='Logo' width='244' height='133' />
      <div className='flex flex-col gap-4 mx-4 w-[80%]'>
        <Button
          rounded
          color='white'
          label='Iniciar sesión'
          onClick={loginModal.onOpen}
        />
        <Button rounded label='Crear una cuenta' onClick={registerModal.onOpen} />
        <Button
          rounded
          color='white'
          label='Continuar con Google'
          icon={FcGoogle}
          onClick={() => signIn('google')}
        />
      </div>
    </div>
  );
};

export default LoginClient;
