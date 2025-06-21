import { FC } from "react";
import Image from "next/image";
import { BrandSectionType } from "@/types/home";
import useStrapiImage from "@/hooks/use-strapi-image";

interface BrandSectionProps {
  brands: BrandSectionType["brands"];
}

const BrandSection: FC<BrandSectionProps> = ({ brands }) => {
  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-6 lg:px-10">
        <h2 className="text-3xl font-normal text-center mb-8">
          Le nostre marche
        </h2>

        <div className="overflow-x-auto py-4">
          <div className="flex justify-center items-center space-x-[76px]">
            {brands.map((brand, index) => (
              <div className="flex-shrink-0" key={index}>
                {brand?.imageUrl?.url ? (
                  <Image
                    src={useStrapiImage(brand.imageUrl.url)}
                    alt={brand.name || "Brand"}
                    width={45}
                    height={45}
                    className="object-contain"
                    loading="lazy"
                  />
                ) : (
                  <Image
                    src="/images/logo-placeholder.png"
                    alt={brand.name || "Brand"}
                    width={45}
                    height={45}
                    className="object-contain"
                    loading="lazy"
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
