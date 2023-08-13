import ClientOnly from "./components/ClientOnly";
import getMoneyAccount from "./actions/getMoneyAccount";
import getCurrentUser from "./actions/getCurrentUser";
import AccountsContainer from "./components/accounts/AccountsContainer";
import TotalsContainer from "./components/TotalsContainer";
import Container from "./components/Container";
import getBudgets from "./actions/getBudgets";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const moneyAccounts = await getMoneyAccount();
  const userBudgets = await getBudgets();

  return (
    <div className="bg-brand-lime h-full pb-20">
      <ClientOnly>
        <Container>
          <TotalsContainer
            moneyAccounts={moneyAccounts}
            currentUser={currentUser}
          />
          <AccountsContainer
            moneyAccounts={moneyAccounts}
            userBudgets={userBudgets}
          />
        </Container>
      </ClientOnly>
    </div>
  );
}
