"use client";

import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FC, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "../../ui/sheet";
import { GlobalData } from "@/types/global";
import useStrapiImage from "@/hooks/use-strapi-image";

const Header: FC<{ companyData: GlobalData }> = ({ companyData }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  const navLinks = companyData?.navLinks ?? [];

  return (
    <header className="sticky top-0 z-50 bg-primary text-white p-4">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        {companyData?.logo?.url ? (
          <Link href="/" className="flex items-center">
            <Image
              src={useStrapiImage(companyData.logo.url)}
              alt="Logo"
              width={104}
              height={58}
              priority
              className="max-h-[58px] object-contain"
            />
          </Link>
        ) : (
          <Link href="/" className="flex items-center">
            <Image
              src={"/images/logo-placeholder.png"}
              alt="Logo"
              width={104}
              height={58}
              priority
              className="max-h-[58px] object-contain"
            />
          </Link>
        )}

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="flex space-x-6">
              {navLinks.map(({ url, label }) => {
                const isActive = pathname === url;

                return (
                  <NavigationMenuItem key={url}>
                    <Link href={url} passHref legacyBehavior>
                      <NavigationMenuLink
                        className={`bg-primary hover:underline ${
                          isActive ? "underline font-bold" : ""
                        }`}
                      >
                        {label}
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Contact Icons + Mobile Toggle */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <a
            href={`mailto:${companyData.email}`}
            className="hover:text-gray-300"
          >
            <Image
              src="/icons/fa-envelope.svg"
              alt="Email Icon"
              width={20}
              height={20}
              className="w-[20px] max-h-[50px] object-contain"
            />
          </a>
          <a href={`tel:${companyData.phone}`} className="hover:text-gray-300">
            <Image
              src="/icons/fa-phone-alt.svg"
              alt="Phone Icon"
              width={20}
              height={20}
              className="w-[20px] max-h-[50px] object-contain"
            />
          </a>

          {/* Mobile Sheet Navigation */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <button
                aria-label="Open menu"
                className="lg:hidden border border-white rounded-full p-2"
              >
                <Menu className="w-6 h-6 text-white" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="left"
              className="w-[85%] max-w-xs bg-primary/75 text-white px-6 py-8 flex flex-col"
            >
              <SheetTitle className="hidden"></SheetTitle>
              <SheetDescription className="hidden"></SheetDescription>
              {/* Branding / Logo */}
              <Link href="/" className="flex items-center space-x-2 mb-10">
                {companyData?.logo?.url ? (
                  <Image
                    src={useStrapiImage(companyData.logo.url)}
                    alt="Logo"
                    width={100}
                    height={50}
                    className="w-[100px] h-auto object-contain"
                  />
                ) : (
                  <Image
                    src="/images/logo-placeholder.png"
                    alt="Logo"
                    width={100}
                    height={50}
                    className="w-[100px] h-auto object-contain"
                  />
                )}
              </Link>

              {/* Navigation Links */}
              <nav className="flex flex-col space-y-4 w-full justify-start items-center">
                {navLinks.map(({ url, label }) => {
                  const isActive = pathname === url;

                  return (
                    <SheetClose asChild key={url}>
                      <Link
                        href={url}
                        className={`block text-lg font-medium tracking-wide px-3 py-2 rounded-md transition-colors duration-200 ${
                          isActive
                            ? "bg-white text-primary font-semibold"
                            : "hover:bg-white hover:text-primary"
                        }`}
                      >
                        {label}
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>

              {/* Contact Info at the bottom */}
              <div className="mt-auto pt-10 border-t border-white/20">
                <p className="text-sm mb-1">Contattaci</p>
                <div className="flex items-center space-x-4 mt-2">
                  <a href={`mailto:${companyData.email}`}>
                    <Image
                      src="/icons/fa-envelope.svg"
                      alt="Social Icon"
                      width={20}
                      height={20}
                      className="w-[20px] h-auto object-contain"
                    />
                  </a>
                  <a href={`tel:${companyData.phone}`}>
                    <Image
                      src="/icons/fa-phone-alt.svg"
                      alt="Social Icon"
                      width={20}
                      height={20}
                      className="w-[20px] h-auto object-contain"
                    />
                  </a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
