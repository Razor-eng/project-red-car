"use client";

import { useEffect, useState } from "react";
import BrandSection from "@/components/Homepage/BrandSection/BrandSection";
import HeroSection from "@/components/Homepage/HeroSection/HeroSection";
import LowConsumptionCarsSection from "@/components/Homepage/LowConsumptionCarSection/LowConsumptionCarSection";
import OfferSection from "@/components/Homepage/OfferSection/OfferSection";
import PopularCarsSection from "@/components/Homepage/PopularCarSection/PopularCarSection";
import ReviewSection from "@/components/Homepage/ReviewSection/ReviewSection";
import Loader from "@/components/shared/Loader";
import { getHomePageData } from "@/lib/api";
import { HomePageData } from "@/types/home";

export default function Home() {
  const [homePageData, setHomePageData] = useState<HomePageData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchHomePageData() {
      try {
        const data = await getHomePageData();
        setHomePageData(data);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHomePageData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div>
      {homePageData?.heroSection && (
        <HeroSection {...homePageData.heroSection} />
      )}
      {homePageData?.offerSection && (
        <OfferSection {...homePageData.offerSection} />
      )}
      {homePageData?.popularCarsSection && (
        <PopularCarsSection {...homePageData.popularCarsSection} />
      )}
      {homePageData?.lowConsumptionCarsSection && (
        <LowConsumptionCarsSection
          {...homePageData.lowConsumptionCarsSection}
        />
      )}
      {homePageData?.reviewSection && (
        <ReviewSection {...homePageData.reviewSection} />
      )}
      {homePageData?.brandSection && (
        <BrandSection {...homePageData.brandSection} />
      )}
    </div>
  );
}
