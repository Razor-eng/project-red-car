"use client";
import { FC } from "react";
import Image from "next/image";
import { PopularCarsSectionType } from "@/types/home";
import useStrapiImage from "@/hooks/use-strapi-image";

interface PopularCarsSectionProps {
  popularCars: PopularCarsSectionType["popularCars"];
}

const PopularCarsSection: FC<PopularCarsSectionProps> = ({ popularCars }) => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-10">
          Più richiesti
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 md:gap-8">
          {popularCars.map((car, index) => (
            <div
              key={index}
              className="bg-gray-200 rounded-xl shadow-md transition-transform duration-300 hover:scale-105 hover:shadow-xl p-4 flex flex-col items-center justify-between"
            >
              <div className="text-center mb-4">
                <h3 className="text-lg md:text-xl font-medium">{car.title}</h3>
                <p className="text-lg font-semibold">{car.description}</p>
              </div>

              {car?.imageUrl?.url ? (
                <Image
                  src={useStrapiImage(car.imageUrl.url)}
                  alt={`${car.title} ${car.description}`}
                  width={156}
                  height={109}
                  className="object-contain w-full h-[120px] rounded-md"
                  loading="lazy"
                />
              ) : (
                <Image
                  src={"/images/car-fallback.png"}
                  alt={`popular-car`}
                  width={156}
                  height={109}
                  className="object-contain w-full h-[120px] rounded-md"
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

export default PopularCarsSection;
