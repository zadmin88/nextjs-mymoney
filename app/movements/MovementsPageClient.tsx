"use client";

// import qs from 'query-string';
import React from "react";
import MovementCard from "../components/movements/MovementCard";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState, useEffect, useMemo } from "react";
import Button from "../components/buttons/Button";

const MovementsPageClient: React.FC<any> = ({ movements }) => {
  const [movType, setMovType] = useState("");

  useEffect(() => {}, [movType]);

  const filteredMovements = useMemo(() => {
    if (movType !== "") {
      return movements.filter((mov: any) => mov.movementType === movType);
    } else {
      return [...movements];
    }
  }, [movType, movements]);

  const handleFilter = useCallback(
    (type: string) => {
      if (movType === type) {
        setMovType("");
      } else {
        setMovType(type);
      }
    },
    [setMovType, movType]
  );

  return (
    <div className="px-6  pt-6">
      <div className="flex gap-4 mb-6">
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
      <div className="flex flex-col gap-4 pb-6">
        {filteredMovements.map((mov: any) => (
          <MovementCard movement={mov} key={mov.id} />
        ))}
      </div>
    </div>
  );
};

export default MovementsPageClient;
