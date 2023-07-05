import './globals.css';
import { Montserrat } from 'next/font/google';

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
        {children}
      </body>
    </html>
  );
}
