"use client";

import Footer from "@/components/shared/Footer/Footer";
import Header from "@/components/shared/Header/Header";
import Loader from "@/components/shared/Loader";
import { getGlobalData } from "@/lib/api";
import { GlobalData } from "@/types/global";
import React, { useEffect, useState } from "react";

const DataInitializer = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [global, setGlobal] = useState<GlobalData | null>(null);

  useEffect(() => {
    async function fetchPageData() {
      try {
        const data = await getGlobalData();
        setGlobal(data);
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPageData();
  }, []);

  if (loading || !global) return <Loader />;

  return (
    <div className={`theme-${global.theme}`}>
      <Header companyData={global} />
      {children}
      <Footer companyData={global} />
    </div>
  );
};

export default DataInitializer;
