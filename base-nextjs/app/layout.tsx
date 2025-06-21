import type React from "react";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/shared/Header/Header";
import Footer from "@/components/shared/Footer/Footer";
import { getGlobalData } from "@/lib/api";
import { Providers } from "@/redux/Providers";
import ScrollToTopOnMount from "@/components/shared/ScrollToTop";

export const metadata: Metadata = {
  title: "Car Rental Service",
  description: "Find and rent your perfect car",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const global = await getGlobalData();
  console.log("Theme from Strapi:", global.theme);

  return (
    <html
      lang="en"
      className={`theme-${global.theme}`}
      suppressHydrationWarning
    >
      <Providers>
        <body suppressHydrationWarning>
          <ScrollToTopOnMount />
          <div>
            <Header companyData={global} />
            {children}
            <Footer companyData={global} />
          </div>
        </body>
      </Providers>
    </html>
  );
}
