"use client";

import FAQComponent from "@/components/faq/FAQComponent";
import FAQHeroSection from "@/components/faq/FAQHeroSection";
import Loader from "@/components/shared/Loader";
import { getFAQPageData } from "@/lib/api";
import { FAQPageData } from "@/types/faq";
import { useEffect, useState } from "react";

const FAQPage: React.FC = () => {
  const [faqData, setFAQData] = useState<FAQPageData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFAQPageData();
        setFAQData(data);
      } catch (error) {
        console.error("Error fetching FAQ data:", error);
      }
    };

    fetchData();
  }, []);

  if (!faqData) {
    return <Loader />;
  }

  console.log(faqData);

  return (
    <div className="px-6">
      <FAQHeroSection image={faqData?.heroImage?.url} />
      <FAQComponent
        faqs={faqData.faqs}
        cta={{ label: faqData.cta.label, url: faqData.cta.url }}
      />
    </div>
  );
};

export default FAQPage;
