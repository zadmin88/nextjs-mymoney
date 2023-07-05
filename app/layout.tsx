import './globals.css';
import { Montserrat } from 'next/font/google';
import ClientOnly from './components/ClientOnly';
import Container from './components/Container';
import LoginModal from './components/modals/LoginModal';
import RegisterModal from './components/modals/RegisteModal';
import ToasterProvider from './providers/ToasterProvider';

const font = Montserrat({ subsets: ['latin'] });

export const metadata = {
  title: 'MyMoney',
  description: 'Expenses tracker',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={font.className} suppressHydrationWarning={true}>
        <ClientOnly>   
          <ToasterProvider />
        <LoginModal />
        <RegisterModal />
        </ClientOnly>
        <div>{children}</div>
      </body>
    </html>
  );
}
