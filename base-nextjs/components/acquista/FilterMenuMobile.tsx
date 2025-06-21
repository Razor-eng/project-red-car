"use client";

import React, { useState } from "react";
import { Search, X } from "lucide-react";

interface FilterMenuMobileProps {
  children?: React.ReactNode;
}

export default function FilterMenuMobile({ children }: FilterMenuMobileProps) {
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const toggleMenu = () => setIsOpen((prev) => !prev);

  return (
    <div className="bg-primary/10 p-4 lg:hidden">
      <button
        className="rounded-lg bg-primary w-full text-white font-medium flex justify-between p-3 items-center text-2xl"
        onClick={toggleMenu}
      >
        Filtri{" "}
        <Search
          className={`transition-transform duration-300 ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white z-50 flex flex-col">
          <div className="flex justify-end p-4">
            <button onClick={closeMenu}>
              <X className="text-4xl" />
            </button>
          </div>
          <div className="flex-1 p-4 overflow-y-auto flex flex-col">
            <div className="flex-1">{children}</div>

            <div className="p-4">
              <button
                className="rounded-lg bg-primary w-full text-white font-medium flex justify-between p-3 items-center text-2xl"
                onClick={closeMenu}
              >
                Cerca
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
