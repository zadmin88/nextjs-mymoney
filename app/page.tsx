"use client";

import useAccountModal from "./hooks/useAccountModal";
export default function Home() {
  const accountModal = useAccountModal();
  return (
    <div>
      <button onClick={accountModal.onOpen} className="bg-brand-teal">
        Agregar cuenta
      </button>
    </div>
  );
}
