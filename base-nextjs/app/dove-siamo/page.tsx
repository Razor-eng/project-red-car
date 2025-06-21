"use client";
import DoveSiamoHero from "@/components/dove-siamo/DoveSiamoHero";
import DoveSiamoMap from "@/components/dove-siamo/DoveSiamoMap";
import Loader from "@/components/shared/Loader";
import { getDoveSiamoData } from "@/lib/api";
import { DoveSiamoType } from "@/types/global";
import { FC, useEffect, useState } from "react";

const DoveSiamoPage: FC = () => {
  const [pageData, setPageData] = useState<DoveSiamoType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const data = await getDoveSiamoData();
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
      <DoveSiamoHero
        address={pageData?.address || "Via delle Pere 98, Caserta, CE 81100"}
        image={pageData?.imageUrl?.url}
      />
      {pageData && <DoveSiamoMap {...pageData} />}
    </div>
  );
};

export default DoveSiamoPage;
