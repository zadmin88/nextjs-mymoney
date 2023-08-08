"use client";

import { useState, useCallback } from "react";

import { useRouter } from "next/navigation";
import Modal from "./Modal";
import Heading from "../Heading";

import useAccountSelectionModal from "@/app/hooks/useAccountSelectionModal";

import useAccountsList from "@/app/hooks/useAccountsList";
import AccountListCard from "../accounts/AccountListCard";
import {} from "react";

const AccountSelectionModal = () => {
  const router = useRouter();
  const accountSelectionModal = useAccountSelectionModal();
  const accountList = useAccountsList((state) => state.accountList);

  const [isLoading, setIsLoading] = useState(false);

  const onChangeAccount = useCallback(
    (accountId: string) => {
      router.push(`/accounts/${accountId}`);
      accountSelectionModal.onClose();
    },
    [router, accountSelectionModal]
  );

  const bodyContent = (
    <div className="flex flex-col gap-4">
      <Heading title="Accounts" />
      {accountList?.length !== 0 &&
        accountList?.map((acc) => (
          <AccountListCard
            name={acc.name}
            id={acc.id}
            accountType={acc.accountType}
            key={acc.id}
            onChangeAccount={onChangeAccount}
          />
        ))}
    </div>
  );

  return (
    <Modal
      color="lime"
      disabled={isLoading}
      isOpen={accountSelectionModal.isOpen}
      actionLabel="+ Agregar"
      onClose={accountSelectionModal.onClose}
      body={bodyContent}
      // footer={footerContent}
    />
  );
};

export default AccountSelectionModal;
