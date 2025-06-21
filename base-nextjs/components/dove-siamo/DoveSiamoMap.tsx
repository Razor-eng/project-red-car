"use client";

import { Button } from "@/components/ui/button";
import { DoveSiamoType } from "@/types/global";
import React, { FC } from "react";

const DoveSiamoMap: FC<DoveSiamoType> = ({
  address,
  description,
  latitude,
  longitude,
  title,
}) => {
  const iframeSrc = `https://www.google.com/maps?q=${latitude},${longitude}&z=17&output=embed`;

  // Google Maps URL using the address
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  // Function to handle click event
  const handleClick = () => {
    window.open(mapsUrl, "_blank");
  };

  return (
    <div className="flex items-center justify-center mb-[37px] md:mb-[112px]">
      <div className="flex flex-col">
        <div className="text-center md:text-left">
          <h2 className="text-[28px] md:text-[44px] font-bold">{title}</h2>
          <p className="text-[17px] md:text-[24px] mb-[20px] md:mb-[30px]">
            {description}
          </p>
        </div>

        {/* Google Maps iframe */}
        <iframe
          src={
            iframeSrc ||
            "https://www.google.com/maps?q=Via+delle+Pere+98,+Caserta,+CE+81100&z=17&output=embed"
          }
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="md:w-[1022px] w-full h-[412px]"
          title="Google Maps"
        />

        <Button
          onClick={handleClick}
          className="bg-primary hover:bg-primary/85 text-white text-xl md:text-base font-semibold text-center px-[38px] py-[10px] w-full md:w-[334px] h-[52px] md:h-[44px] rounded-[5px] mt-[30px] md:mt-[24px] gap-3 flex items-center justify-center"
        >
          Posizione esatta <span className="text-[20px]">{`>`}</span>
        </Button>
      </div>
    </div>
  );
};

export default DoveSiamoMap;
