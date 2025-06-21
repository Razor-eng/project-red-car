"use client";

import React, { useRef, useState, useEffect } from "react";
import AutoSimiliCard from "./AutoSimiliCard";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const AutoSimili = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(0);

  const totalCards = 10;
  const scrollStep = 2;

  useEffect(() => {
    const updateCardWidth = () => {
      const container = scrollRef.current;
      if (container) {
        const card = container.querySelector("div > div");
        if (card instanceof HTMLElement) {
          setCardWidth(card.offsetWidth + 16);
        }
      }
    };

    updateCardWidth();
    window.addEventListener("resize", updateCardWidth);
    return () => window.removeEventListener("resize", updateCardWidth);
  }, []);

  const scrollToIndex = (index: number) => {
    const container = scrollRef.current;
    if (!container || !cardWidth) return;
    container.scrollTo({
      left: cardWidth * index,
      behavior: "smooth",
    });
    setScrollIndex(index);
  };

  const goToNext = () => {
    const maxIndex = totalCards - scrollStep;
    if (scrollIndex < maxIndex) scrollToIndex(scrollIndex + scrollStep);
  };

  const goToPrev = () => {
    if (scrollIndex > 0) scrollToIndex(scrollIndex - scrollStep);
  };

  return (
    <div className="w-full max-w-[1180px] mx-auto mb-10 md:mb-24 flex flex-col items-center">
      <h2 className="text-2xl md:text-4xl font-semibold text-center mb-2">
        Auto simili
      </h2>
      <p className="text-base text-center md:hidden text-gray-700">
        Auto simili Ricevi un preventivo gratuito, senza impegno e non
        vincolante.
      </p>

      {/* Scrollable container */}
      <div
        ref={scrollRef}
        className="w-full flex overflow-x-auto scroll-smooth snap-x snap-mandatory gap-4 py-6 no-scrollbar"
      >
        {[...Array(totalCards)].map((_, index) => (
          <div
            key={index}
            className="snap-start min-w-[calc(50%-0.5rem)] md:min-w-[calc(33.333%-1rem)] lg:min-w-[calc(25%-1rem)]"
          >
            <AutoSimiliCard />
          </div>
        ))}
      </div>

      {/* Navigation buttons */}
      <div className="w-full flex items-center justify-between mt-2">
        <Button
          size="icon"
          onClick={goToPrev}
          disabled={scrollIndex === 0}
          className="bg-white hover:bg-zinc-300/70 text-primary border-2 border-primary rounded-md disabled:opacity-50"
        >
          <ChevronLeft />
        </Button>

        <div className="flex items-center justify-center gap-1 md:hidden">
          {[...Array(Math.ceil(totalCards / scrollStep))].map((_, index) => (
            <div
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${
                scrollIndex === index * scrollStep
                  ? "bg-primary"
                  : "bg-gray-400"
              }`}
            />
          ))}
        </div>

        <Button
          size="icon"
          onClick={goToNext}
          disabled={scrollIndex + scrollStep >= totalCards}
          className="bg-white hover:bg-zinc-300/70 text-primary border-2 border-primary rounded-md disabled:opacity-50"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  );
};

export default AutoSimili;
