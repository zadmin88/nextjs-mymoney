import ClientOnly from "../components/ClientOnly";
import AddPageClient from "./AddPageClient";

const page = () => {
  return (
    <ClientOnly>
      <AddPageClient />
    </ClientOnly>
  );
};

export default page;
