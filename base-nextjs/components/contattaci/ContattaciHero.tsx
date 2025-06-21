import useStrapiImage from "@/hooks/use-strapi-image";
import Image from "next/image";
import React, { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface ContattaciHeroProps {
  image: string | undefined;
}

const ContattaciHero: FC<ContattaciHeroProps> = ({ image }) => {
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
            Contattaci, siamo pronti a risponderti
          </h2>
          <p className="text-xs md:text-sm lg:text-3xl">
            La consulenza e gratuita
          </p>
        </div>

        {/* Select dropdown */}
        <div className="absolute bottom-3 right-3 lg:bottom-12 lg:right-12">
          <Select>
            <SelectTrigger className="w-fit border-2 border-white bg-transparent text-white text-sm md:text-lg lg:text-2xl font-semibold px-4 md:px-6 py-3 rounded-md hover:bg-white hover:text-primary transition duration-300 flex items-center gap-2 group">
              <SelectValue placeholder="Vai" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="contataci-1">Domanda 1</SelectItem>
              <SelectItem value="contataci-2">Domanda 2</SelectItem>
              <SelectItem value="contataci-3">Domanda 3</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default ContattaciHero;
