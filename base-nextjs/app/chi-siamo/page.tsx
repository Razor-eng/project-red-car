"use client";
import ChiSiamoComponent from "@/components/chi-siamo/ChiSiamoComponent";
import ChiSiamoHero from "@/components/chi-siamo/ChiSiamoHero";
import Loader from "@/components/shared/Loader";
import { getChiSiamoData } from "@/lib/api";
import { ChiSiamoType } from "@/types/global";
import { useEffect, useState } from "react";

const ChiSiamoPage: React.FC = () => {
  const [pageData, setPageData] = useState<ChiSiamoType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const data = await getChiSiamoData();
        setPageData(data);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPageData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="px-6">
      <ChiSiamoHero
        image={pageData?.imageUrl?.url}
        logo={pageData?.logo?.url}
      />
      {pageData && <ChiSiamoComponent {...pageData} />}
    </div>
  );
};

export default ChiSiamoPage;
