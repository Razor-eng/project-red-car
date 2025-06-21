"use client";
import ContattaciForm from "@/components/contattaci/ContattaciForm";
import ContattaciHero from "@/components/contattaci/ContattaciHero";
import Loader from "@/components/shared/Loader";
import { getContattaciPageData } from "@/lib/api";
import { ContattaciType } from "@/types/global";
import { useEffect, useState } from "react";

const ContattaciPage: React.FC = () => {
  const [pageData, setPageData] = useState<ContattaciType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const data = await getContattaciPageData();
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
      <ContattaciHero image={pageData?.imageUrl?.url} />
      <ContattaciForm {...pageData} />
    </div>
  );
};

export default ContattaciPage;
