'use client';
import Image from 'next/image';
import Button from '../components/buttons/Button';
import { FcGoogle } from 'react-icons/fc';

const LoginClient = () => {
  return (
    <div className='bg-brand-lime w-screen h-screen flex flex-col justify-center items-center gap-40'>
      <Image src='/images/logo.svg' alt='Logo' width='244' height='133' />
      <div className='flex flex-col gap-4 mx-4 w-[80%]'>
        <Button
          rouded
          color='white'
          label='Iniciar sesión'
          onClick={() => {}}
        />
        <Button rouded label='Crear una cuenta' onClick={() => {}} />
        <Button
          rouded
          color='white'
          label='Continuar con Google'
          icon={FcGoogle}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default LoginClient;
