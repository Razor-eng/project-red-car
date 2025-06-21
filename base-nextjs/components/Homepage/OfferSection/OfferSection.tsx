import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { OfferSectionData as OfferSectionType } from "@/types/home";
import useStrapiImage from "@/hooks/use-strapi-image";
import { off } from "process";
import Link from "next/link";

interface OfferSectionProps {
  offers: OfferSectionType["offers"];
}

const OfferSection: FC<OfferSectionProps> = ({ offers }) => {
  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const goToNextOffer = () => {
    setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
  };

  const goToPreviousOffer = () => {
    setCurrentOfferIndex(
      (prevIndex) => (prevIndex - 1 + offers.length) % offers.length
    );
  };

  useEffect(() => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const activeItem = container.children[currentOfferIndex] as
        | HTMLElement
        | undefined;

      if (activeItem) {
        const offsetLeft =
          activeItem.offsetLeft -
          container.offsetWidth / 2 +
          activeItem.offsetWidth / 2;

        container.scrollTo({ left: offsetLeft, behavior: "smooth" });
      }
    }
  }, [currentOfferIndex]);

  return (
    <section className="relative bg-white py-16">
      <div className="container mx-auto px-6 lg:px-10">
        <h2 className="text-[30px] md:text-5xl font-bold text-center mb-2">
          Offerte last minute
        </h2>
        <p className="text-center font-normal text-[22px] md:text-2xl mb-12">
          pronta consegna
        </p>

        <div className="relative">
          <div
            ref={carouselRef}
            className="flex gap-6 scrollbar-hide scroll-smooth px-4 md:px-12"
          >
            {offers.map((offer, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[250px] md:w-[400px] md:h-[400px] transition-transform duration-500 ${
                  currentOfferIndex === index ? "scale-95" : "scale-90"
                }`}
              >
                <div
                  className={`bg-gray-200 p-4 md:p-6 rounded-xl h-full flex flex-col justify-between ${
                    currentOfferIndex === index
                      ? "shadow-[0px_1px_25px_0px_rgba(0,0,0,0.15)] shadow-primary"
                      : "shadow-md"
                  }`}
                >
                  <div className="text-center mt-2">
                    <h3 className="text-[16px] md:text-xl font-bold">
                      {offer.title}
                    </h3>
                    <p className="text-[14px] md:text-sm text-gray-600 mt-1">
                      {offer.description}
                    </p>
                  </div>

                  {offer?.imageUrl?.url ? (
                    <Image
                      src={useStrapiImage(offer.imageUrl.url)}
                      alt={offer?.title || "Offer image"}
                      width={1020}
                      height={580}
                      className="object-cover w-full h-[160px] md:h-[260px] rounded-xl mt-3"
                      loading="lazy"
                    />
                  ) : (
                    <Image
                      src={"/images/car-fallback.png"}
                      alt={offer?.title || "Offer image"}
                      width={1020}
                      height={580}
                      className="object-cover w-full h-[160px] md:h-[260px] rounded-xl mt-3"
                      loading="lazy"
                    />
                  )}

                  {currentOfferIndex === index ? (
                    <div className="flex justify-center mt-4">
                      <Link
                        href={`/noleggia/${offers[currentOfferIndex]?.url}`}
                      >
                        <button className="bg-primary text-white px-6 py-2 rounded-full text-lg font-semibold hover:bg-primary/85 transition duration-300">
                          Scopri &gt;
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center mt-4">
                      <p className="text-xl font-semibold">{offer.price}</p>
                      <p className="text-sm text-gray-500">
                        {offer.monthlyPrice}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {offers.length > 1 && (
            <div className="flex justify-between items-center mt-8">
              <button
                className="bg-transparent p-3 border border-primary rounded-md shadow-lg hover:bg-white transition duration-300"
                onClick={goToPreviousOffer}
              >
                <ChevronLeft className="text-primary text-xl" />
              </button>

              <button
                className="bg-transparent p-3 border border-primary rounded-md shadow-lg hover:bg-white transition duration-300"
                onClick={goToNextOffer}
              >
                <ChevronRight className="text-primary text-xl" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default OfferSection;
