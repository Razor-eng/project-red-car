"use client";

import { FC, useState, useRef, useEffect } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { reviewSectionType } from "@/types/home";
import useStrapiImage from "@/hooks/use-strapi-image";

interface ReviewSectionProps {
  isDettagli?: boolean;
  reviews: reviewSectionType["reviews"];
}

const ReviewSection: FC<ReviewSectionProps> = ({ isDettagli, reviews }) => {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!reviews || reviews.length === 0) {
    return null; // Render nothing if there are no reviews
  }

  const goToNextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const goToPreviousReview = () => {
    setCurrentReviewIndex(
      (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length
    );
  };

  useEffect(() => {
    if (carouselRef.current) {
      const container = carouselRef.current;
      const activeItem = container.children[currentReviewIndex] as HTMLElement;
      const offsetLeft =
        activeItem.offsetLeft -
        container.offsetWidth / 2 +
        activeItem.offsetWidth / 2;
      container.scrollTo({ left: offsetLeft, behavior: "smooth" });
    }
  }, [currentReviewIndex]);

  return (
    <section className="relative bg-white py-12 w-full overflow-hidden">
      <div className="mx-auto">
        <h2 className="text-[30px] md:text-[40px] font-normal text-center mb-2">
          Recensioni
        </h2>

        <div className="relative overflow-hidden mt-[40px]">
          <div
            ref={carouselRef}
            className="flex gap-6 overflow-x-hidden scrollbar-hide scroll-smooth px-4 md:px-12"
          >
            {reviews.map((review, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-[250px] md:w-[428px] transition-transform duration-500 ${
                  currentReviewIndex === index ? "scale-100" : "scale-95"
                }`}
              >
                <div className={`bg-gray-200 p-6 rounded-xl shadow-md h-full`}>
                  <div className="flex justify-center mb-4">
                    {review.imageUrl?.url ? (
                      <Image
                        src={useStrapiImage(review.imageUrl.url)}
                        alt={review?.name || "User"}
                        width={80}
                        height={80}
                        className="rounded-full"
                        loading="lazy"
                      />
                    ) : (
                      <Image
                        src={"/images/user-placeholder.png"}
                        alt={review?.name || "User"}
                        width={80}
                        height={80}
                        className="rounded-full"
                        loading="lazy"
                      />
                    )}
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">
                      {review.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 max-w-[200px] md:max-w-[345px]">
                      {review.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {reviews.length > 1 && (
          <div className="px-4 md:px-12 w-full flex justify-between items-center mt-4">
            <button
              className="bg-transparent p-3 border border-primary rounded-md shadow-lg hover:bg-white transition duration-300"
              onClick={goToPreviousReview}
            >
              <ChevronLeft className="text-primary text-xl" />
            </button>

            <div className="flex justify-center items-center mt-0">
              <div className="flex flex-col items-center text-center">
                <span className="text-yellow-500">
                  {"★".repeat(
                    Math.round(reviews[currentReviewIndex]?.rating || 0)
                  )}
                  {"☆".repeat(
                    5 - Math.round(reviews[currentReviewIndex]?.rating || 0)
                  )}
                </span>
                {!isDettagli && (
                  <span className="text-gray-500 mt-1 font-bold block">
                    Google | {reviews[currentReviewIndex]?.rating}/5
                  </span>
                )}
              </div>
            </div>

            <button
              className="bg-transparent p-3 border border-primary rounded-md shadow-lg hover:bg-white transition duration-300"
              onClick={goToNextReview}
            >
              <ChevronRight className="text-primary text-xl" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ReviewSection;
