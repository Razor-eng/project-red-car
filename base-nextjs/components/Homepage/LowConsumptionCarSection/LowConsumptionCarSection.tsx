"use client";
import { FC } from "react";
import Image from "next/image";
import { LowConsumptionCarsSectionType } from "@/types/home";
import useStrapiImage from "@/hooks/use-strapi-image";

interface LowConsumptionCarsSectionProps {
  cars: LowConsumptionCarsSectionType["cars"];
}

const LowConsumptionCarsSection: FC<LowConsumptionCarsSectionProps> = ({
  cars,
}) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
          Pochi consumi
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-6 shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl flex flex-col justify-between items-center"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl md:text-2xl font-medium text-gray-700">
                  {car.title}
                </h3>
                <p className="text-2xl md:text-3xl font-bold text-gray-900">
                  {car.description}
                </p>
              </div>

              {car?.imageUrl?.url ? (
                <Image
                  src={useStrapiImage(car.imageUrl.url)}
                  alt={`${car.title} ${car.description}`}
                  width={425}
                  height={184}
                  className="w-full h-[150px] md:h-[184px] object-contain rounded-lg"
                  loading="lazy"
                />
              ) : (
                <Image
                  src={"/images/car-fallback.png"}
                  alt={`${car.title} ${car.description}`}
                  width={425}
                  height={184}
                  className="w-full h-[150px] md:h-[184px] object-contain rounded-lg"
                  loading="lazy"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LowConsumptionCarsSection;
