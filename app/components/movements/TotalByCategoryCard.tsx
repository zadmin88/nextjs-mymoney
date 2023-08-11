"use client";
import Image from "next/image";

const TotalByCategoryCard: React.FC<any> = ({ movement }) => {
  return (
    <div className="flex flex-col border rounded-xl px-6 py-2 gap-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src={`/icons/categories/${movement.category}Vector.png`}
            alt="icon"
            height={100}
            width={100}
            className="h-6 w-6"
          />
          <div className="flex flex-col ml-6 ">
            <span className="text-base font-semibold">{movement.category}</span>
            <span className="text-base font-light">
              {movement.movementType}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span
            className={`text-base font-semibold ${
              movement.movementType === "outcome"
                ? "text-red-500"
                : "text-brand-lime"
            }`}
          >
            $ {movement._sum.amount}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TotalByCategoryCard;
