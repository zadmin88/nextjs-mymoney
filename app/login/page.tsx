import ClientOnly from '../components/ClientOnly';
import LoginClient from './LoginClient';
import Image from 'next/image';

const Login = () => {
  return (
    <ClientOnly>
      <LoginClient />
    </ClientOnly>
  );
};

export default Login;
