"use client";

// import qs from 'query-string';
import React from "react";
import MovementCard from "../components/movements/MovementCard";

import { useCallback, useState, useEffect, useMemo } from "react";
import NoMovements from "../components/movements/NoMovements";

import Button from "../components/buttons/Button";
import SearchInput from "../components/inputs/SearchInput";
import { ChangeEvent } from "react";

const MovementsPageClient: React.FC<any> = ({ movements }) => {
  const [movType, setMovType] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const filterMovementsByName = (movements: any[], searchTerm: string) => {
    return movements?.filter((mov: any) =>
      mov.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredMovements = useMemo(() => {
    let result = [...movements];

    if (movType !== "") {
      if (movType === "transfer") {
        result = result.filter((mov: any) => mov.category === movType);
      } else {
        result = result.filter((mov: any) => mov.movementType === movType);
      }
    }

    if (searchInput !== "") {
      result = filterMovementsByName(result, searchInput);
    }

    return result;
  }, [movType, searchInput, movements]);

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

  if (movements.length === 0)
    return (
      <div className="pt-10 pb-24 flex flex-col gap-6 h-screen  w-full items-center justify-center">
        <NoMovements />
      </div>
    );
  return (
    <div className="px-6  pt-6 pb-20 flex flex-col gap-6">
      <SearchInput
        id="description"
        bgColor="gray"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchInput(e.target.value)
        }
      />
      <div className="flex gap-4 ">
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
      {filteredMovements.length === 0 ? (
        <div className="pt-10 pb-24 flex flex-col gap-6 h-screen  w-full items-center justify-center">
          <NoMovements />
        </div>
      ) : (
        <div className="flex flex-col gap-4 pb-6">
          {filteredMovements.map((mov: any) => (
            <MovementCard movement={mov} key={mov.id} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MovementsPageClient;
