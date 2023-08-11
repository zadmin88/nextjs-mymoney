"use client";

import { BsSearch } from "react-icons/bs";
import { ChangeEvent } from "react";

interface SearchInputProps {
  id: string;
  type?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  bgColor?: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  id,
  type = "text",
  onChange,
  bgColor = "white",
}) => {
  return (
    <div className="w-full relative">
      <BsSearch
        size={18}
        className="
            text-neutral-700
            absolute
            top-3
            left-3
          "
      />

      <input
        id={id}
        onChange={onChange}
        placeholder="Search"
        type={type}
        className={`
        
          w-full
          p-2
          pl-12       
          font-light          
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          rounded-full         ${
            bgColor === "white" ? "bg-white" : "bg-gray-100 text-gray-900 "
          }

        `}
      />
    </div>
  );
};

export default SearchInput;
