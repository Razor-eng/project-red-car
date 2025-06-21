"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MinusIcon, PlusIcon } from "lucide-react";
import React, { useState } from "react";

export default function DettagliAccordion({ veicolo }: any) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const schedaTecnica = [
    { label: "Cilindrata", value: veicolo.cilindrata || "N/A" },
    { label: "KW", value: veicolo.kw },
    { label: "CV", value: veicolo.cv },
    { label: "Velocità Max", value: veicolo.velocitaMax || "N/A" },
    { label: "Accelerazione (0-100 km/h)", value: veicolo.accelerazione || "N/A" },
    { label: "Coppia", value: veicolo.coppia || "N/A" },
    { label: "Trazione", value: veicolo.trazione },
    { label: "Pneumatici", value: veicolo.pneumatici },
    { label: "Lunghezza", value: veicolo.lunghezza },
    { label: "Larghezza", value: veicolo.larghezza },
    { label: "Altezza", value: veicolo.altezza },
    { label: "Passo", value: veicolo.passo },
    { label: "Numero Porte", value: veicolo.porte },
    { label: "Numero Airbag", value: veicolo.numeroAirbag || "N/A" },
    { label: "Volume Bagagliaio", value: veicolo.volumeBagagliaio || "N/A" },
    { label: "Numero Marce", value: veicolo.numeroMarce || "N/A" },
    { label: "Motore", value: veicolo.motore },
    { label: "Immatricolazione", value: new Date(veicolo.immatricolazione).toLocaleDateString() },
    { label: "Chilometraggio", value: `${veicolo.km} km` },
  ];

  const serviziInclusi = [
    "Copertura assicurativa RCA con franchigia euro 500",
    "Furto parziale scoperto 10% del danno subito con franchigia euro 500",
    "Furto totale ed incendio scoperto 10% valore eurotax giallo",
    "Soccorso stradale e Gestione sinistri",
    "Canone antifurto satellitare",
  ];

  const validAccessori = Array.isArray(veicolo.accessori) ? veicolo.accessori : [];

  const renderSection = (id: string, title: string, content: React.ReactNode) => {
    const isOpen = openItem === id;

    return (
        <Collapsible
            open={isOpen}
            onOpenChange={() =>
                setOpenItem((prev) => (prev === id ? null : id))
            }
        >
          <CollapsibleTrigger className="flex w-full justify-between items-center py-6 text-left font-bold text-[20px] md:text-[26px]">
            <span>{title}</span>
            <span className="text-xl font-bold border rounded-full text-muted-foreground border-muted-foreground p-2">
            {isOpen ? <MinusIcon /> : <PlusIcon />}
          </span>
          </CollapsibleTrigger>
          <CollapsibleContent className="transition-all duration-300 ease-in-out pb-6 px-2 md:px-5">
            {content}
          </CollapsibleContent>
        </Collapsible>
    );
  };

  return (
      <div className="w-full xl:w-[1180px] md:mx-auto space-y-6 my-[96px]">
        <h1 className="text-[32px] md:text-[42px] font-extrabold text-center md:text-left tracking-tight">
          Dettagli
        </h1>

        <div className="w-full rounded-md divide-y divide-zinc-300 border-y border-zinc-300 mt-4">

          {renderSection(
              "optional",
              "Optional",
              validAccessori.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {validAccessori.map((acc: string, idx: number) => (
                        <div
                            key={idx}
                            className="bg-muted rounded-lg px-4 py-3 text-sm text-muted-foreground shadow-sm"
                        >
                          {acc}
                        </div>
                    ))}
                  </div>
              ) : (
                  <p className="text-muted-foreground">Nessun optional disponibile.</p>
              )
          )}

          {renderSection(
              "scheda",
              "Scheda tecnica",
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {schedaTecnica.map(({ label, value }, idx) => (
                    <div
                        key={idx}
                        className="border rounded-lg px-4 py-3 bg-zinc-50 shadow-sm"
                    >
                      <div className="text-xs text-zinc-500 font-medium uppercase tracking-wide">
                        {label}
                      </div>
                      <div className="text-sm font-semibold text-zinc-800">{value}</div>
                    </div>
                ))}
              </div>
          )}

          {renderSection(
              "servizi",
              "Servizi inclusi",
              <ul className="list-disc list-inside space-y-2 text-[16px] text-muted-foreground">
                {serviziInclusi.map((s, idx) => (
                    <li key={idx}>{s}</li>
                ))}
              </ul>
          )}

        </div>
      </div>
  );
}
