import { Button } from "@/components/ui/button";
import useStrapiImage from "@/hooks/use-strapi-image";
import { ChiSiamoType } from "@/types/global";
import Image from "next/image";
import React, { FC } from "react";

const ChiSiamoComponent: FC<ChiSiamoType> = ({
  carSection,
  description,
  quote,
  title,
}) => {
  return (
    <div className="flex flex-col gap-[37px] md:gap-[112px] mb-[72px] md:mb-[150px] px-0">
      <div className="flex flex-col xl:w-[1075px] mx-auto">
        <h2 className="font-bold text-[34px] md:text-[44px]">{title}</h2>
        <p className="text-[22px] md:text-[24px]">{description}</p>
      </div>

      {/* Image and Text */}
      <div className="xl:w-[1075px] mx-auto flex flex-col-reverse xl:flex-row gap-8 md:gap-0 items-center justify-between">
        <div className="md:w-[473px]">
          <h2 className="font-bold text-[34px] md:text-[44px]">
            {carSection[0].title}
          </h2>
          <p className="text-[22px] md:text-[24px]">
            {carSection[0].description}
          </p>
        </div>
        {carSection[0]?.imageUrl?.url ? (
          <Image
            src={useStrapiImage(carSection[0].imageUrl.url)}
            alt="car"
            height={600}
            width={600}
            className="rounded-[10px] w-full h-[292px] md:w-[541px] md:h-[410px]"
          />
        ) : (
          <div className="bg-[#F2F2F2] rounded-[10px] w-full h-[292px] md:w-[541px] md:h-[410px]">
            <Image
              src={"/images/placeholder.png"}
              alt="hero"
              height={579}
              width={1158}
              className="md:max-h-[410px] object-contain"
            />
          </div>
        )}
      </div>

      {/* Quote */}
      <div className="flex flex-col gap-[20px] items-center justify-center">
        <span className="text-primary text-9xl">❝</span>
        <h2 className="font-bold text-2xl lg:text-[34px] text-center">
          {quote}
        </h2>
      </div>

      {/* Image and Text */}
      <div className="xl:w-[1075px] mx-auto flex flex-col xl:flex-row gap-8 md:gap-0 items-center justify-between">
        {carSection[1]?.imageUrl?.url ? (
          <Image
            src={useStrapiImage(carSection[1].imageUrl.url)}
            alt="car"
            height={600}
            width={600}
            className="rounded-[10px] w-full h-[292px] md:w-[541px] md:h-[410px]"
          />
        ) : (
          <div className="bg-[#F2F2F2] rounded-[10px] w-full h-[292px] md:w-[541px] md:h-[410px]">
            <Image
              src={"/images/placeholder.png"}
              alt="hero"
              height={579}
              width={1158}
              className="md:max-h-[410px] object-contain"
            />
          </div>
        )}
        <div className="md:w-[473px]">
          <h2 className="font-bold text-[34px] md:text-[44px]">
            {carSection[1].title}
          </h2>
          <p className="text-[22px] md:text-[24px]">
            {carSection[1].description}
          </p>
        </div>
      </div>

      {/* Other options */}
      <div className="xl:w-[1075px] flex flex-col gap-[37px] mx-auto items-center justify-center">
        <p>
          Nullam at ante fringilla, sagittis purus finibus, hendrerit nunc.
          Integer cursus lorem leo, nec fringilla mauris eleifend sed.
        </p>
        <div className="w-full grid md:grid-cols-2 gap-[20px] md:gap-[40px]">
          <Button className="bg-primary hover:bg-primary/85 text-white text-xl md:text-base font-semibold text-center px-[38px] py-[10px] w-full h-[52px] md:h-[44px] rounded-[5px] gap-3 flex items-center justify-center">
            Parco veicoli <span className="text-[20px]">{`>`}</span>
          </Button>
          <Button className="bg-transparent hover:bg-primary/85 hover:text-white text-primary border-2 border-primary text-xl md:text-base font-semibold text-center px-[38px] py-[10px] w-full h-[52px] md:h-[44px] rounded-[5px]">
            Vieni a trovaci
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChiSiamoComponent;
