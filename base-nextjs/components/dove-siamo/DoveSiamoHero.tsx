"use client";

import useStrapiImage from "@/hooks/use-strapi-image";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { FC } from "react";

interface DoveSiamoHeroProps {
  address: string;
  image: string;
}

const DoveSiamoHero: FC<DoveSiamoHeroProps> = ({ address, image }) => {
  // Google Maps URL using the address
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address
  )}`;

  return (
    <div className="my-[37px] md:my-[112px] flex items-center justify-center">
      <div className="relative w-full xl:w-[1158px] xl:h-[579px] h-auto rounded-[10px] overflow-hidden">
        {/* Background Image */}
        {image ? (
          <Image
            src={useStrapiImage(image)}
            alt="hero"
            height={579}
            width={1158}
            className="w-full xl:w-[1158px] xl:h-[579px] h-auto rounded-[10px]"
          />
        ) : (
          <div className="bg-[#F2F2F2] w-full xl:w-[1158px] xl:h-[579px] h-auto rounded-[10px]">
            <Image
              src={"/images/placeholder.png"}
              alt="hero"
              height={579}
              width={1158}
              className="max-h-[579px] object-contain"
            />
          </div>
        )}

        <div className="absolute bottom-3 left-3 lg:bottom-12 md:left-16 text-white">
          <h2 className="text-lg md:text-2xl lg:text-5xl font-bold leading-tight">
            Dove siamo
          </h2>
          <p className="text-xs md:text-sm lg:text-3xl">Vieni a trovarci</p>
        </div>

        <Link
          href={mapsUrl}
          target="_blank"
          aria-label="Open in Google Maps"
          rel="noopener noreferrer"
          className="absolute bottom-3 right-3 lg:bottom-12 lg:right-12"
        >
          <button className="border-2 border-white text-white p-2 md:px-6 py-2 rounded-md text-sm md:text-lg lg:text-2xl font-semibold hover:bg-white hover:text-primary transition duration-300 flex items-center gap-1">
            Google Maps <ChevronRight />
          </button>
        </Link>
      </div>
    </div>
  );
};

export default DoveSiamoHero;
