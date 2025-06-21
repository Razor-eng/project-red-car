import useStrapiImage from "@/hooks/use-strapi-image";
import Image from "next/image";
import React, { FC } from "react";

interface ChiSiamoHeroProps {
  image: string | undefined;
  logo?: string | undefined;
}

const ChiSiamoHero: FC<ChiSiamoHeroProps> = ({ image, logo }) => {
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

        {/* Overlay Text */}
        <div className="absolute bottom-4 left-8 md:bottom-8 md:left-16 text-white text-4xl md:text-6xl lg:text-7xl 2xl:text-9xl font-bold drop-shadow-lg">
          Chi siamo
        </div>

        {/* Overlay Logo */}
        <div className="absolute bottom-4 right-4 md:bottom-12 md:right-10">
          <Image
            src={logo ? useStrapiImage(logo) : "/images/logo-placeholder.png"}
            alt="Redcar Logo"
            width={100}
            height={50}
            className="w-16 xl:w-full xl:h-auto max-h-[50px] md:max-h-[70px] xl:max-h-[100px] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default ChiSiamoHero;
