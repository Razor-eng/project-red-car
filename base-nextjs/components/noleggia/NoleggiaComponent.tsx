"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import React, { FC, useState } from "react";
import NollegiaAutoSimiliCard from "./NollegiaAutoSimiliCard";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import FilterComponent from "../acquista/FilterComponent";
import { CarDataType } from "@/types/global";

const NollegiaComponent: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const result = [...Array(420).keys()];
  const itemsPerPage = 12; // Number of items to display per page
  const totalPages = Math.ceil(result.length / itemsPerPage); // Total number of pages

  const visiblePages = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, "...", currentPage, "...", totalPages);
      }
    }
    return pages;
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handleClick = (page: number | string) => {
    if (typeof page === "number") setCurrentPage(page);
  };

  return (
    <div className="w-full">
      <div className="w-full">
        {/* Nollegia filter */}
        <div className="w-full flex flex-col lg:flex-row items-center lg:justify-between">
          <div className="w-full flex flex-col items-center lg:items-start">
            <h2 className="text-[32px] font-bold">Nollegia</h2>
            <p className="text-[20px]">Pronta consegna</p>
          </div>
          <div className="my-4 w-full lg:hidden">
            <Dialog>
              <DialogTrigger className="w-full lg:w-[357px] h-[44px] lg:h-[57px] border-2 border-primary rounded-[10px] px-[18px] py-[10px] flex items-center justify-between">
                <span className="font-bold text-primary text-[20px] lg:text-base">
                  Filtri
                </span>
                <ChevronDown className="text-lg text-primary" />
              </DialogTrigger>
              <DialogContent className="lg:hidden">
                <DialogHeader className="hidden">
                  <DialogTitle></DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <FilterComponent />
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex flex-row-reverse lg:flex-col justify-between w-full gap-3 items-center lg:items-end">
            <Select>
              <SelectTrigger className="w-[220px] lg:w-[357px] h-[44px] lg:h-[57px] border-2 border-primary rounded-[10px] px-[18px] py-[10px]">
                <p className="text-[14px] lg:text-[16px] text-black">
                  Ordina per <span className="font-bold">Articolo</span>
                </p>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">A</SelectItem>
                <SelectItem value="b">B</SelectItem>
                <SelectItem value="c">C</SelectItem>
              </SelectContent>
            </Select>
            <h2 className="text-[20px] font-bold max-w-[20px] lg:max-w-none">
              {result.length} risultati
            </h2>
          </div>
        </div>

        {/* Nollegia result */}
        <div className="hidden lg:flex flex-wrap xl:grid xl:grid-cols-3 2xl:grid-cols-4 gap-[20px] mt-[30px]">
          {result
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((_, id) => (
              <NollegiaAutoSimiliCard key={id} />
            ))}
        </div>
        <div className="grid lg:hidden grid-cols-2 sm:grid-cols-3 gap-[20px] mt-[30px]">
          {result
            .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
            .map((_, id) => (
              <NollegiaAutoSimiliCard key={id} />
            ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-[22px] lg:gap-[16px] mt-[40px] lg:mt-[30px]">
        {currentPage > 1 && (
          <button
            onClick={handlePrev}
            className="text-primary border-2 border-primary flex items-center justify-center text-sm font-bold rounded-[5px] px-3 py-1 gap-1"
          >
            <ArrowLeft size={17} /> Prev
          </button>
        )}

        {visiblePages().map((item, idx) =>
          item === "..." ? (
            <span key={idx} className="text-sm">
              ...
            </span>
          ) : (
            <span
              key={idx}
              className={`size-8 lg:size-6 flex items-center justify-center text-sm rounded-full cursor-pointer ${
                item === currentPage
                  ? "bg-primary text-white"
                  : "border border-gray-400 text-black"
              }`}
              onClick={() => handleClick(item)}
            >
              {item}
            </span>
          )
        )}

        {currentPage < totalPages && (
          <button
            onClick={handleNext}
            className="text-primary border-2 border-primary flex items-center justify-center text-sm font-bold rounded-[5px] px-3 py-1 gap-1"
          >
            Next <ArrowRight size={17} />
          </button>
        )}
      </div>

      {/* ADV Section for mobile screens */}
      <div className="mt-[40px] flex flex-col gap-[20px] lg:hidden">
        <div className="w-full h-[213px] bg-gradient-to-b from-[#FFB800] to-[#FFB900] flex items-center justify-center rounded-[10px] font-bold text-6xl text-white">
          ADV
        </div>
        <div className="w-full h-[213px] bg-gradient-to-b from-[#6F00FF] to-[#9D00FF] flex items-center justify-center rounded-[10px] font-bold text-6xl text-white">
          ADV
        </div>
      </div>
    </div>
  );
};

export default NollegiaComponent;
