"use client";

import { Slider } from "@/components/ui/slider";
import { CheckCircle } from "lucide-react";
import React, { FC, useState } from "react";

const OppureCalcola: FC = () => {
  const [value, setValue] = useState([3.5]);
  const [durata, setDurata] = useState([8]);

  const points = [
    { point: "Acquisto a distanza" },
    { point: "Permuta dell’usato" },
    { point: "Spedizione in tutta Italia" },
    { point: "Preventivo senza impegno" },
  ];

  return (
    <div className="w-full xl:w-[1180px] h-fit my-[37px] md:my-[20px] px-[18px] py-[18px] flex flex-col md:flex-row items-center gap-[40px] rounded-[10px] bg-[#F0F0F0]">
      <div className="max-w-[454px]">
        <h2 className="text-[24px] text-center md:text-left">
          Oppure calcola la tua rata
        </h2>
        <p className="text-[18px] text-center md:text-left">
          Ricevi un preventivo gratuito, senza impegno e non vincolante.
        </p>
        <div className="mt-[20px] md:mt-[10px] mx-4 md:mx-0">
          <div className="grid md:grid-cols-2 gap-4 md:gap-2">
            {points.map((item, index) => (
              <div
                key={index}
                className="text-[18px] md:text-[14px] flex items-center gap-2"
              >
                <CheckCircle className="size-7 md:size-5" fill="#D4D6DC" />{" "}
                {item.point}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full md:w-auto">
        <div className="w-full md:w-[271px]">
          <div className="flex items-center justify-between font-bold">
            <label className="block text-sm font-bold text-[#757575]">
              Anticipo
            </label>
            <span>{value}00€</span>
          </div>
          <div className="relative mt-2">
            <Slider
              defaultValue={[3.5]}
              max={10}
              step={0.5}
              onValueChange={setValue}
              value={value}
              className="md:w-[271px]"
            />
          </div>
        </div>
        <div className="w-full md:w-[271px]">
          <div className="flex items-center justify-between font-bold">
            <label className="block text-sm font-bold text-[#757575]">
              Duarata
            </label>
            <span>{durata} Anni</span>
          </div>
          <div className="relative mt-2">
            <Slider
              defaultValue={[0]}
              max={8}
              step={0.5}
              onValueChange={setDurata}
              value={durata}
              className="md:w-[271px]"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center md:items-start justify-between h-full py-[10px] md:py-[30px]">
        <h3 className="font-extrabold text-[37px] md:text-[30px]">
          335.27€<span className="text-[18px] md:text-[14px]">/mese</span>
        </h3>
        {/* Request Button */}
        <div className="flex items-center justify-center">
          <button className="w-full h-[70px] md:h-[50px] bg-primary text-white font-semibold rounded-[5px] px-8 hover:bg-primary/80 text-xl md:text-base transition duration-300 ease-in-out">
            Richiedi un preventivo
          </button>
        </div>
      </div>
    </div>
  );
};

export default OppureCalcola;
