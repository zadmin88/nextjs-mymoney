"use client";

import { useCallback, useState, useMemo } from "react";
import Button from "../components/buttons/Button";
import DoughnutChart from "../components/DoughnutChart";
import TotalByCategoryCard from "../components/movements/TotalByCategoryCard";
import NoMovements from "../components/movements/NoMovements";

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

  if (movements.length === 0)
    return (
      <div className="pt-10 pb-24 flex flex-col gap-6 h-screen  w-full items-center justify-center">
        <NoMovements />
      </div>
    );
  return (
    <div className="px-6  pt-10 pb-24 flex flex-col gap-6  w-full items-center">
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
        {filteredMovements.length === 0 ? (
          <NoMovements />
        ) : (
          <div>
            <h1 className="text-xl font-semibold">Totals by category</h1>
            {filteredMovements.map((mov: any, i) => (
              <TotalByCategoryCard key={mov.category + i} movement={mov} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPageClient;
