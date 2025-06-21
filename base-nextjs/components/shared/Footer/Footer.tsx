import useStrapiImage from "@/hooks/use-strapi-image";
import { GlobalData } from "@/types/global";
import Image from "next/image";
import Link from "next/link";
import { FC } from "react";

const Footer: FC<{ companyData: GlobalData }> = ({ companyData }) => {
  return (
    <footer className="bg-primary text-white">
      <div className="px-6 md:px-16 py-10 md:py-14 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-10 items-start text-center md:text-left">
          {/* Logo & Address */}
          <div className="col-span-3 flex flex-col items-center gap-6">
            {companyData?.footerLogo?.url ? (
              <Image
                src={useStrapiImage(companyData.footerLogo.url)}
                alt="Logo"
                width={600}
                height={540}
                priority
                className="w-[180px] md:w-[240px] h-auto aspect-[2/1] object-contain"
              />
            ) : (
              <Image
                src={"/images/logo-placeholder.png"}
                alt="Logo"
                width={600}
                height={540}
                priority
                className="w-[180px] md:w-[240px] max-h-[540px] h-auto aspect-[2/1] object-contain"
              />
            )}

            <div className="text-xs space-y-1 text-gray-300 flex flex-col lg:items-center">
              <div className="flex gap-1 flex-col lg:flex-row">
                {companyData?.companyName && (
                  <p className="font-semibold lg:font-normal text-white lg:text-gray-300">
                    {companyData.companyName}
                  </p>
                )}
                {companyData?.address && <p>{companyData.address}</p>}
              </div>
              <div className="flex gap-1 flex-col lg:flex-row">
                {companyData?.vatNumber && <p>{companyData.vatNumber}</p>}
                {companyData?.socialCapital && (
                  <p>{companyData.socialCapital}.</p>
                )}
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="col-span-4 grid grid-cols-2 gap-6 justify-items-center md:justify-items-start">
            <div className="flex flex-col gap-3">
              {companyData?.navLinks?.map(({ id, label, url }) => (
                <Link
                  key={id}
                  href={url}
                  className="hover:text-accent hover:underline transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-3">
              {companyData?.footerLinks?.map(({ id, label, url }) => (
                <Link
                  key={id}
                  href={url}
                  className="hover:text-accent hover:underline transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="text-center text-sm py-4 bg-primary-dark/60 shadow-[0_-18px_30px_rgba(0,0,0,0.15)]">
        <p>
          Powered by{" "}
          <a
            href="#"
            className="font-semibold hover:underline text-accent transition-colors"
          >
            Gruppo Piccirillo
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
