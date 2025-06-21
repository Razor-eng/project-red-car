"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { ContattaciType } from "@/types/global";
import { Mail } from "lucide-react";
import Image from "next/image";
import React, { FC, useState } from "react";

const ContattaciForm: FC<ContattaciType> = ({ email: contactEmail, phone }) => {
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const [cognome, setCognome] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");

  return (
    <div className="my-[53px] md:my-[72px] flex flex-col items-center justify-center">
      <div className="mb-[57px] w-full xl:w-[1158px] h-auto xl:h-[517px] rounded-[10px] bg-[#F5F5F5] p-[20px] md:p-[60px]">
        {/* Contact Form */}
        <div className="flex flex-col gap-[40px]">
          {/* Dati Personali Form */}
          <div className="">
            <h2 className="font-extrabold text-2xl text-center md:text-left">
              Dati personali
            </h2>
            <div className="flex flex-col md:flex-row gap-[14px] md:gap-[68px] mt-[20px]">
              <Input
                type="text"
                placeholder="Cognome"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
                className="border-2 border-primary rounded-[6px] px-[10px] py-[10px] w-full"
              />
              <Input
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className="border-2 border-primary rounded-[6px] px-[10px] py-[10px] w-full"
              />
            </div>
          </div>

          {/* Recapti Form */}
          <div className="">
            <h2 className="font-extrabold text-2xl text-center md:text-left">
              Recapiti
            </h2>
            <div className="flex flex-col md:flex-row gap-[14px] md:gap-[68px] mt-[20px]">
              <Input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-primary rounded-[6px] px-[10px] w-full"
              />
              <Input
                type="number"
                placeholder="Telefono"
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="border-2 border-primary rounded-[6px] px-[10px] w-full"
              />
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="mt-[10px] flex flex-col gap-[14px] md:gap-[10px] font-medium md:text-sm">
            <p className="text-center md:text-left">
              Ti contatteremo appena sarà possibile. (Generalmente entro 24h)
            </p>
            <div className="flex items-center justify-center md:justify-start gap-[10px]">
              <Checkbox
                checked={acceptedPrivacy}
                onCheckedChange={(checked) =>
                  setAcceptedPrivacy(checked === true)
                }
                className="border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
              />
              <p className="">
                Accetto il{" "}
                <span className="underline text-primary">
                  Trattamento dei dati
                </span>
              </p>
            </div>
            <Button className="bg-primary hover:bg-primary/85 text-white text-xl md:text-base font-semibold text-center px-[38px] py-[10px] w-full md:w-[334px] h-[52px] md:h-[44px] rounded-[5px] mt-[30px] md:mt-[24px] gap-3 flex items-center justify-center">
              Invia <span className="text-[20px]">{`>`}</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Alternative Contact Options */}
      <div className="flex flex-col items-center gap-[38px] md:gap-[52px]">
        <h2 className="text-[28px] md:text-[44px] font-bold">Oppure?</h2>
        <div className="flex flex-col md:flex-row items-center gap-[14px] md:gap-[60px]">
          {/* Button to call */}
          <a href={`tel:${phone}`} className="hover:text-gray-300">
            <Button className="bg-primary hover:bg-primary/85 text-white text-xl md:text-base font-semibold text-center px-[38px] py-[10px] w-[386px] md:w-[334px] h-[52px] md:h-[54px] rounded-[5px] gap-4 flex items-center justify-center">
              <Image
                src={"/icons/fa-phone-alt.svg"}
                alt="Phone Icon"
                height={16}
                width={16}
              />{" "}
              Chiamaci
            </Button>
          </a>

          {/* Button to email */}
          <a href={`mailto:${contactEmail}`}>
            <Button className="bg-white md:bg-primary hover:bg-primary/85 text-primary md:text-white border-2 md:border-none border-primary text-xl md:text-base font-semibold text-center px-[38px] py-[10px] w-[386px] md:w-[334px] h-[52px] md:h-[54px] rounded-[5px] gap-4 flex items-center justify-center">
              {/* Image for large screen */}
              <Image
                src={"/icons/fa-envelope.svg"}
                alt="Envelope Icon"
                height={16}
                width={16}
                className="hidden md:block"
              />
              {/* Image for small screen */}
              <Mail height={16} width={16} className="md:hidden" /> Chiamaci
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContattaciForm;
