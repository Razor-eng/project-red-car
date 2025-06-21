"use client";

import Image from "next/image";
import { formatPrice } from "@/utils/format-price";
import { formatDate } from "@/utils/format-date";
import Link from "next/link";
import React from "react";

export interface Product {
  product: any;
}

export default function ProductCard({ product }: Product) {
  return (
    <div className="relative bg-[#F4F4F4] noleggioCard  rounded-lg">
      <div className="image-container">
        {new Date(product.immatricolazione) > new Date() && (
          <div className="text-xs rounded p-1 px-2 absolute top-2 left-2 bg-primary text-white border-0">
            {`In arrivo entro ${formatDate(
              new Date(product.immatricolazione)
            )}`}
          </div>
        )}

        <Image
          src={product.foto}
          alt={product.marca + " " + product.modello + " " + product.articolo}
          className="rounded-lg w-full max-h-[15rem] min-h-[15rem] object-cover "
          width={400}
          height={300}
          loading={"eager"}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/car-fallback.png";
          }}
        />
      </div>

      <div className="px-4 pb-4 py-2 relative">
        <div className="absolute bg-white/80 bottom-0 right-0 m-2 max-w-max max-h-max px-2 rounded-lg">
          <p>{product.provincia ?? "-"}</p>
        </div>

        <div className="flex justify-between  py-4">
          <div className=" max-w-[50%]">
            <h3 className="font-bold text-lg ">{product.marca}</h3>
            <h4 className="font-normal text-xs truncate">{product.modello}</h4>
          </div>

          <div>
            <p className="text-lg sm:text-3xl md:text-xl xl:text-xl font-bold ">
              {product.tipoVeicolo === "Furgone" && product.codiceIVA === "22"
                ? formatPrice(+product.prezzo / 1.22)
                : formatPrice(+product.prezzo)}
              {product.tipoVeicolo === "Furgone" &&
                product.codiceIVA === "22" && (
                  <span className="text-xs sm:text-md md:text-sm xl:text-xs">
                    + IVA
                  </span>
                )}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 py-4 hide-on-hover-product">
          <div className="rounded-md text-center flex gap-x-2 items-center text-xs ">
            <Image
              src={`/assets/icon/calendario-icon.svg`}
              alt="immatricolazione"
              width={20}
              height={20}
            />
            {product.immatricolazione ? (
              <p>{formatDate(new Date(product.immatricolazione))}</p>
            ) : (
              <p className="text-muted-foreground">Non specificato</p>
            )}
          </div>
          <div className="rounded-md text-center flex gap-x-2 items-center text-xs ">
            <Image
              src={`/assets/icon/chilometri-icon.svg`}
              alt="cambio"
              width={20}
              height={20}
            />
            {product.km ? (
              <p>{product?.km}</p>
            ) : (
              <p className="text-muted-foreground">Non specificato</p>
            )}
          </div>
          <div className="rounded-md text-center flex gap-x-2 items-center text-xs ">
            <Image
              src={`/assets/icon/alimentazione-icon.svg`}
              alt="cambio"
              width={20}
              height={20}
            />
            {product.alimentazione ? (
              <p>{product.alimentazione}</p>
            ) : (
              <p className="text-muted-foreground">Non specificato</p>
            )}
          </div>
          <div className="rounded-md text-center flex gap-x-2 items-center text-xs ">
            <Image
              src={`/assets/icon/cambio-icon.svg`}
              alt="cambio"
              width={15}
              height={15}
            />
            {product.cambio ? (
              <p>{product.cambio}</p>
            ) : (
              <p className="text-muted-foreground">Non specificato</p>
            )}
          </div>
        </div>

        <Link
          hrefLang="it"
          id={product.slug}
          title={product.marca + " " + product.modello}
          href={`/acquista/${product.slug}`}
        >
          <button
            className="show-on-hover text-white font-bold my-4 bg-primary rounded-md flex gap-3 items-center justify-center w-full py-4"
            aria-label={`Scopri ${product.marca} ${product.modello}`}
          >
            Scopri
            <svg
              width="19"
              height="13"
              viewBox="0 0 19 13"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17 6.5L17.7179 5.80385L18.393 6.5L17.7179 7.19615L17 6.5ZM1 7.5C0.447716 7.5 0 7.05228 0 6.5C0 5.94772 0.447716 5.5 1 5.5V7.5ZM12.3846 0.303854L17.7179 5.80385L16.2821 7.19615L10.9488 1.69615L12.3846 0.303854ZM17.7179 7.19615L12.3846 12.6961L10.9488 11.3039L16.2821 5.80385L17.7179 7.19615ZM17 7.5H1V5.5H17V7.5Z"
                fill="white"
              />
            </svg>
          </button>
        </Link>
      </div>
    </div>
  );
}
