"use client";

import React from "react";
import Container from "../Container";
import NavButton from "../buttons/NavButton";
import { useCallback } from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const pathName = usePathname();
  const router = useRouter();

  const handleClick = useCallback(
    (url: string) => {
      const urlTo = `/${url === "Home" ? "/" : url.toLowerCase()}`;

      // console.log(urlTo)
      router.push(urlTo);
    },
    [router]
  );

  return (
    <div className="fixed w-full bottom-0 bg-white z-10 shadow-sm ">
      <div className="py-5 border-t">
        <Container>
          <div
            className="
            flex 
            flex-row 
            items-center 
            justify-between
            gap-3
            md:gap-0
            px-8
          "
          >
            <NavButton
              label="Home"
              activeVector="/icons/vectorHomeActive.png"
              inactiveVector="/icons/vectorHomeInactive.png"
              onClick={handleClick}
              selected={pathName === "/"}
            />
            <NavButton
              label="Add"
              activeVector="/icons/vectorAddActive.png"
              inactiveVector="/icons/vectorAddInactive.png"
              onClick={handleClick}
              selected={pathName === "/add"}
            />
            <NavButton
              label="Movements"
              activeVector="/icons/vectorMovementsActive.png"
              inactiveVector="/icons/vectorMovementsInactive.png"
              onClick={handleClick}
              selected={pathName === "/movimientos"}
            />
            <NavButton
              label="Categories"
              activeVector="/icons/vectorCategoriesActive.png"
              inactiveVector="/icons/vectorCategoriesInactive.png"
              onClick={handleClick}
              selected={pathName === "/categorias"}
            />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
