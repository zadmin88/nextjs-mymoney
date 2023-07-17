import ClientOnly from "./components/ClientOnly";
import getMoneyAccount from "./actions/getMoneyAccount";
import getCurrentUser from "./actions/getCurrentUser";
import AccountsContainer from "./components/accounts/AccountsContainer";
import TotalsContainer from "./components/TotalsContainer";
import Container from "./components/Container";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const moneyAccounts = await getMoneyAccount();

  return (
    <div className="bg-brand-lime">
      <ClientOnly>
        <Container>
          <TotalsContainer
            moneyAccounts={moneyAccounts}
            currentUser={currentUser}
          />
          <AccountsContainer moneyAccounts={moneyAccounts} />
        </Container>
      </ClientOnly>
    </div>
  );
}
