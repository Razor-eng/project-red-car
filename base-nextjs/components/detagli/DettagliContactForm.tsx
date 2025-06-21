"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React, { FC, useState } from "react";

const DettagliContactForm: FC = () => {
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const [cognome, setCognome] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div className="w-full xl:w-[1180px] mb-[45px] md:mb-[96px]">
      <div className="flex flex-col gap-[10px] md:gap-[40px]">
        {/* Contact Form */}
        <div className="flex flex-col">
          <h1 className="text-[28px] md:text-[36px]">Richiedi un preventivo</h1>
          <p className="text-left text-[22px] md:text-lg font-medium">
            Senza impegno
          </p>
        </div>

        {/* Form Inputs */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-x-[34px] gap-y-[18px] mt-[20px]">
          <Input
            type="text"
            placeholder="Nome (*)"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="border-2 border-primary rounded-[6px] px-[10px] py-[10px] w-full"
          />
          <Input
            type="text"
            placeholder="Cognome"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            className="border-2 border-primary rounded-[6px] px-[10px] py-[10px] w-full"
          />
          <Input
            type="email"
            placeholder="Indirizzo Email (*)"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-2 border-primary rounded-[6px] px-[10px] w-full"
          />
          <Input
            type="number"
            placeholder="Numero di telefono"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            className="border-2 border-primary rounded-[6px] px-[10px] w-full"
          />
          <Textarea
            placeholder="Descrivi la tua richiesta, indicando la durata, il kilometraggio e l'anticipo che preferisci"
            value={description}
            rows={4}
            onChange={(e) => setDescription(e.target.value)}
            className="border-2 border-primary rounded-[6px] px-[10px] py-[20px] w-full mt-[16px] md:mt-[8px] md:col-span-2"
          />
        </div>

        {/* Agreement Checkbox */}
        <div className="flex flex-col gap-[14px] md:gap-[10px] font-medium md:text-sm mt-[16px] md:mt-0">
          <div className="flex items-start justify-center md:justify-start gap-[10px]">
            <Checkbox
              checked={acceptedPrivacy}
              onCheckedChange={(checked) =>
                setAcceptedPrivacy(checked === true)
              }
              className="border-2 border-primary data-[state=checked]:bg-primary data-[state=checked]:text-white"
            />
            <p className="text-[14px] md:text-xs text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              faucibus rutrum fermentum. Maecenas gravida aliquet felis, eget
              aliquam metus ultricies vitae. Pellentesque lacinia, leo sed
              cursus aliquam, mauris libero venenatis diam, id hendrerit dolor
              lectus vel neque.
            </p>
          </div>
          <Button className="bg-primary hover:bg-primary/85 text-white text-xl md:text-base font-semibold text-center px-[38px] py-[10px] w-full md:w-[334px] h-[52px] md:h-[44px] rounded-[5px] mt-[10px] md:mt-[24px]">
            Invia
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DettagliContactForm;
