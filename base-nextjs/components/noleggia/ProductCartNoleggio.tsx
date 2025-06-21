"use client";

import Image from "next/image";
import { formatPrice } from "@/utils/format-price";
import { useRouter } from "next/navigation";
import React from "react";

interface ProductCartNoleggioProps {
  product: any;
  showBadge?: boolean;
}

export default function ProductCartNoleggio({
  product,
  showBadge = false,
}: ProductCartNoleggioProps) {
  const router = useRouter();

  const handleClick = () => {
    // Salva la posizione di scroll corrente
    sessionStorage.setItem("scrollPosition", window.scrollY.toString());

    // Naviga alla pagina del dettaglio del veicolo
    router.push(`/noleggia/${product.slug}`);
  };

  return (
    <div className="relative bg-[#F4F4F4] noleggioCard rounded-lg ">
      <div className="relative">
        <div className="flex justify-between gap-3 p-4 absolute w-full">
          <div className="bg-white bg-opacity-80 text-center rounded-md text-xs flex-1">
            KM {product.km}
          </div>
          <div className="flex-1">
            <div className="rounded-md text-center flex-1"></div>
          </div>
          <div className="bg-white  bg-opacity-80 rounded-md text-center text-xs flex-1">
            {product.immatricolazione
              ? new Date(product.immatricolazione).getFullYear()
              : ""}
          </div>
        </div>

        <Image
          src={product.foto}
          alt={product.marca + " " + product.modello}
          className="w-full rounded-t-lg max-h-[15rem] min-h-[15rem] object-cover"
          width={300}
          height={160}
          loading={"eager"}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/car-fallback.png";
          }}
        />

        {showBadge && (
          <div className="text-xs rounded p-1 px-2 absolute bottom-2 left-2 bg-primary text-white border-0">
            {`Noleggio`}
          </div>
        )}
      </div>

      <div className="flex justify-between p-4">
        <div className=" max-w-[50%]">
          <h3 className="font-bold text-lg ">{product?.marca}</h3>
          <h4 className="font-normal text-xs truncate">{product?.modello}</h4>
        </div>

        <div>
          <p className="text-lg sm:text-3xl md:text-xl xl:text-xl font-bold ">
            {formatPrice(+product?.rata)}{" "}
            <span className="text-sm text-gray-600 ml-1">/mese</span>
          </p>
          <p className="text-xs text-right text-gray-500">IVA esclusa</p>
          <div>
            <p className="font-medium text-sm text-right text-gray-700">
              Anticipo: {formatPrice(3000, true)}
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-between gap-3 py-4 hide-on-hover p-4">
        <div className=" rounded-md text-center flex flex-col items-center  text-sm flex-1">
          <Image
            src={`/assets/icon/steering-wheel.svg`}
            alt="immatricolazione"
            width={35}
            height={35}
          />
          {product?.categoria ? (
            <div className="flex flex-col">{product.categoria}</div>
          ) : (
            <p className="text-muted-foreground">Non specificato</p>
          )}
        </div>
        <div className=" rounded-md text-center flex flex-col items-center text-sm flex-1">
          <Image
            src={`/assets/icon/transmission.svg`}
            alt="cambio"
            width={30}
            height={30}
          />
          {product?.cambio ? (
            <div className="flex flex-col">{product.cambio}</div>
          ) : (
            <p className="text-muted-foreground">Non specificato</p>
          )}
        </div>
        <div className=" rounded-md text-center flex flex-col items-center text-sm flex-1">
          <Image
            src={`/assets/icon/fuel.svg`}
            alt="cambio"
            width={30}
            height={30}
          />
          {product.alimentazione ? (
            <div className="flex flex-col truncate">
              {product.alimentazione}
            </div>
          ) : (
            <p className="text-muted-foreground">Non specificato</p>
          )}
        </div>
      </div>

      <div className="p-4">
        <button
          onClick={handleClick}
          className="show-on-hover p-4 text-white font-bold my-4 bg-primary rounded-md flex gap-3 items-center justify-center w-full py-4"
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
      </div>
    </div>
  );
}
