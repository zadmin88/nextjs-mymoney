"use client";

import { useCallback, useState, useEffect, useMemo } from "react";
import Button from "../components/buttons/Button";
import DoughnutChart from "../components/DoughnutChart";
import TotalByCategoryCard from "../components/movements/TotalByCategoryCard";

const CategoriesPageClient: React.FC<any> = ({ movements }) => {
  const [movType, setMovType] = useState("outcome");

  const filteredMovements = useMemo(() => {
    let result = [...movements];

    if (movType !== "") {
      if (movType === "transfer") {
        result = result.filter((mov: any) => mov.category === movType);
      } else {
        result = result.filter((mov: any) => mov.movementType === movType);
      }
    }

    // if (searchInput !== "") {
    //   result = filterMovementsByName(result, searchInput);
    // }

    return result;
  }, [movType, movements]);

  const handleFilter = useCallback(
    (type: string) => {
      if (movType === type) {
        setMovType("outcome");
      } else {
        setMovType(type);
      }
    },
    [setMovType, movType]
  );

  return (
    <div className="px-6  pt-10 flex flex-col gap-6 pb-6 w-full items-center">
      {/* <SearchInput
          id="description"
          bgColor="gray"
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchInput(e.target.value)
          }
        /> */}
      <div className="flex gap-4 w-full">
        <Button
          label="Expenses"
          rounded
          onClick={() => handleFilter("outcome")}
          color={movType === "outcome" ? "" : "inactive"}
          small
        />

        <Button
          label="Incomes"
          rounded
          onClick={() => handleFilter("income")}
          color={movType === "income" ? "" : "inactive"}
          small
        />

        <Button
          label="Transfers"
          rounded
          onClick={() => handleFilter("transfer")}
          color={movType === "transfer" ? "" : "inactive"}
          small
        />
      </div>
      <div className="w-[250px] mt-6">
        <DoughnutChart data={filteredMovements} />
      </div>
      <div className="flex flex-col gap-6 w-full">
        <h1 className="text-xl font-semibold">Totals by category</h1>
        {filteredMovements.map((mov: any, i) => (
          <TotalByCategoryCard key={mov.category + i} movement={mov} />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPageClient;
