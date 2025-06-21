import Image from "next/image";
import Link from "next/link";
import React from "react";

const NollegiaAutoSimiliCard = () => {
  const carDetails = [
    { icon: "/icons/calendar.svg", label: "10/2023" },
    { icon: "/icons/pickup-car.svg", label: "0 Km" },
    { icon: "/icons/fuel.svg", label: "Ibrida Benzina" },
  ];

  return (
    <div className="w-full md:w-[272px] h-auto md:h-[373px] p-[14px] bg-[#F4F4F4] flex flex-col md:items-center gap-[12px] group hover:shadow-[0_4px_20px_rgba(0,17,168,0.5)]">
      <div className="flex flex-col">
        <h2 className="text-[18px] md:text-[27px] font-extrabold md:font-bold text-center">
          Lynk e Co 01
        </h2>
        <p className="text-[14px] md:text-[12px] text-center">
          1.5 Phev 261cv Auto fwd MY23
        </p>
      </div>

      <h3 className="text-[16px] md:text-[20px] text-center font-bold">
        32.000 €
      </h3>

      <Image
        src={"/images/car-fallback.png"}
        alt="Car Image"
        width={600}
        height={600}
        className="w-full md:w-[244px] md:h-[165px] object-contain rounded-[5px]"
      />

      <div className="grid md:grid-cols-3 md:gap-1 mt-2 md:mt-0 justify-between gap-1 group-hover:hidden">
        {carDetails.map((detail, index) => (
          <div key={index} className="flex md:flex-col items-center gap-[5px]">
            <Image
              src={detail.icon}
              alt="Icon"
              width={600}
              height={600}
              className="size-[18px] object-contain"
            />
            <p className="text-[14px] md:text-[10px] font-semibold">
              {detail.label}
            </p>
          </div>
        ))}
      </div>

      <Link href={`/noleggia/id`} className="w-full">
        <button className="bg-primary text-white text-[14px] md:text-[16px] font-bold rounded-[5px] w-full hidden group-hover:flex items-center justify-center mt-2 py-2">
          Scopri
        </button>
      </Link>
    </div>
  );
};

export default NollegiaAutoSimiliCard;
