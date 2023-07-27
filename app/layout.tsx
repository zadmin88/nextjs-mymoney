import "./globals.css";
import { Montserrat } from "next/font/google";
import ClientOnly from "./components/ClientOnly";
import LoginModal from "./components/modals/LoginModal";
import RegisterModal from "./components/modals/RegisteModal";
import MovementModal from "./components/modals/MovementModal";
import UpdateMovementModal from "./components/modals/UpdateMovementModal";
import ToasterProvider from "./providers/ToasterProvider";
import Navbar from "./components/navbar/Navbar";
import AccountModal from "./components/modals/AccountModal";
import AccountSelectionModal from "./components/modals/AccountSelectionModal";
// import getMoneyAccount from "./actions/getMoneyAccount";

const font = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "MyMoney",
  description: "Expenses tracker",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={font.className} suppressHydrationWarning={true}>
        <ClientOnly>
          <AccountModal />
          <MovementModal />
          <UpdateMovementModal />
          <AccountSelectionModal />
          <ToasterProvider />
          <LoginModal />
          <RegisterModal />
          <Navbar />
        </ClientOnly>
        <div className="pb-20">{children}</div>
      </body>
    </html>
  );
}
