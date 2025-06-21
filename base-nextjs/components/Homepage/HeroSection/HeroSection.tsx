"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import { HeroSectionData } from "@/types/home";
import useStrapiImage from "@/hooks/use-strapi-image";
import Link from "next/link";

const HeroSection: FC<HeroSectionData> = ({
  searchTitle,
  searchPlaceholder,
  button,
  ctaButton,
  offers,
}) => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);

  // Function to go to the next offer
  const goToNextOffer = () => {
    setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
  };

  // Function to go to the previous offer
  const goToPreviousOffer = () => {
    setCurrentOfferIndex(
      (prevIndex) => (prevIndex - 1 + offers.length) % offers.length
    );
  };

  const [query, setQuery] = useState("");

  return (
    <section className="relative bg-white py-16">
      <div className="container mx-auto px-6 lg:px-16">
        <div className="flex flex-col items-center mb-12">
          <div className="relative w-full max-w-4xl">
            {/* Input */}
            <input
              id="car-search"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-6 pt-6 pb-2 text-lg text-black border-2 border-primary rounded-full focus:outline-none focus:ring-2 focus:ring-primary placeholder-transparent"
              placeholder="Quale auto cerchi?"
            />

            {/* Faux stacked placeholder */}
            {query === "" && (
              <div className="absolute left-6 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <p className="text-black text-sm md:text-lg font-medium leading-tight">
                  {searchTitle}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  {searchPlaceholder}
                </p>
              </div>
            )}

            {/* Search Icon */}
            <button
              className="absolute right-6 top-1/2 transform -translate-y-1/2 text-primary"
              aria-label="Search"
              onClick={() => console.log("Search triggered:", query)}
            >
              <Search width={24} height={24} />
            </button>
          </div>
        </div>

        {/* Offer Slider */}
        <div className="relative flex items-center justify-center overflow-hidden bg-gray-200 rounded-xl shadow-lg w-full lg:w-[980px] lg:h-[580px] mx-auto">
          {offers.length > 0 && offers[currentOfferIndex]?.imageUrl?.url ? (
            <Image
              src={useStrapiImage(offers[currentOfferIndex]?.imageUrl?.url)}
              alt="Car Offer"
              width={1020}
              height={580}
              className="object-fit max-w-full max-h-full"
              priority
            />
          ) : (
            <div className="bg-[#F2F2F2] w-full h-full flex items-center justify-center">
              <Image
                src={`/images/placeholder.png`}
                alt="Default Car Offer"
                width={1020}
                height={580}
                className="object-contain w-full h-full"
                priority
              />
            </div>
          )}
          <div className="absolute bottom-2 lg:bottom-16 left-2 lg:left-10 text-white z-10">
            <h2 className="text-xl lg:text-4xl font-bold mb-2 drop-shadow-md">
              {offers[currentOfferIndex]?.title || "Offerta 1"}
            </h2>
            <p className="text-lg mb-4 drop-shadow-md">
              {offers[currentOfferIndex]?.description || "Spiegazione offerta"}
            </p>
          </div>

          <div className="absolute bottom-2 lg:bottom-16 right-2 lg:right-10">
            <Link href={`/noleggia/${offers[currentOfferIndex]?.url}`}>
              <button className="border-2 border-white text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-white hover:text-primary transition duration-300 flex items-center gap-1">
                {button || "Vedi"} <ChevronRight />
              </button>
            </Link>
          </div>
        </div>

        {/* Navigation Buttons */}
        {offers.length > 1 && (
          <>
            <div className="hidden lg:block absolute top-1/2 left-24 transform -translate-y-1/2 text-white z-20">
              <button
                className="bg-transparent p-3 border border-primary rounded-md shadow-lg hover:bg-white transition duration-300"
                onClick={goToPreviousOffer}
              >
                <ChevronLeft className="text-primary text-3xl" />
              </button>
            </div>
            <div className="hidden lg:block absolute top-1/2 right-24 transform -translate-y-1/2 text-white z-20">
              <button
                className="bg-transparent p-3 border border-primary rounded-md shadow-lg hover:bg-white transition duration-300"
                onClick={goToNextOffer}
              >
                <ChevronRight className="text-primary text-3xl" />
              </button>
            </div>
            <div className="flex items-center justify-between lg:justify-center mt-4">
              <div className="text-white z-20 lg:hidden">
                <button
                  className="bg-transparent p-3 border border-primary rounded-md shadow-lg hover:bg-white transition duration-300"
                  onClick={goToPreviousOffer}
                >
                  <ChevronLeft className="text-primary text-3xl" />
                </button>
              </div>

              <div className="flex items-center">
                {offers.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentOfferIndex(index)}
                    className={`w-3 h-3 mx-1 rounded-full ${
                      currentOfferIndex === index ? "bg-primary" : "bg-gray-400"
                    }`}
                  />
                ))}
              </div>

              <div className="text-white z-20 lg:hidden">
                <button
                  className="bg-transparent p-3 border border-primary rounded-md shadow-lg hover:bg-white transition duration-300"
                  onClick={goToNextOffer}
                >
                  <ChevronRight className="text-primary text-3xl" />
                </button>
              </div>
            </div>
          </>
        )}

        {/* CTA Button */}
        <div className="flex justify-center mt-12">
          <button className="bg-primary text-white px-8 py-3 rounded-full text-xl font-semibold hover:bg-primary/85 transition duration-300">
            {ctaButton || "Vai al parco veicoli"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
