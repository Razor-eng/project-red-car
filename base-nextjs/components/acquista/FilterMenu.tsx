"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { formatPrice } from "@/utils/format-price";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CarFront, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  ButtonGroup,
  ButtonGroupItem,
} from "@/components/acquista/CustomRadioGroup";
import { SliderRange } from "@/components/acquista/SliderRange";

export default function FilterMenu({
  filters,
  pageFrom,
  marcaList = [],
  modelloList = [],
  alimentazioneList = [],
  cambioList = [],
  minMaxPrezzo = [0, 100000],
  minMaxKm = [0, 200000],
  minMaxImmatricolazione = [2000, 2023],
}: {
  pageFrom: string;
  filters: Record<string, string>;
  marcaList: Array<any>;
  modelloList: Array<any>;
  alimentazioneList: Array<any>;
  cambioList: Array<any>;
  minMaxPrezzo: [number, number];
  minMaxKm: [number, number];
  minMaxImmatricolazione: [number, number];
}) {
  const router = useRouter();

  const [marca, setMarca] = useState(filters.marca || "");
  const [modello, setModello] = useState(filters.modello || "");
  const [alimentazione, setAlimentazione] = useState(
    filters.alimentazione || ""
  );
  const [cambio, setCambio] = useState(filters.cambio || "");
  const [prezzoRange, setPrezzoRange] = useState([
    minMaxPrezzo[0],
    minMaxPrezzo[1],
  ]);
  const [kmRange, setKmRange] = useState([minMaxKm[0], minMaxKm[1]]);
  const parsedMinMaxImmatricolazione = minMaxImmatricolazione.map(Number);
  const [immatricolazioneRange, setImmatricolazioneRange] = useState([
    parsedMinMaxImmatricolazione[0],
    parsedMinMaxImmatricolazione[1],
  ]);
  const [tipoVeicolo, setTipoVeicolo] = useState(filters.tipoVeicolo);

  const handleFilterChange = (key: string, value: any) => {
    // Se la marca è selezionata, resetta tutti gli altri filtri
    let updatedFilters = { ...filters };

    if (key === "marca" && value === "none") {
      handleClearFilters();
      router.replace(`/${pageFrom}`);
      return;
    }

    if (value == null || value === "none") {
      if (key === "kmRange") {
        const { kmDa, kmA, ...rest } = updatedFilters;
        updatedFilters = rest;
      } else if (key === "immatricolazioneRange") {
        const { annoDa, annoA, ...rest } = updatedFilters;
        updatedFilters = rest;
      } else if (key === "prezzoRange") {
        const { prezzoDa, prezzoA, ...rest } = updatedFilters;
        updatedFilters = rest;
      } else if (key === "tipoVeicolo") {
        const { tipoVeicolo, ...rest } = updatedFilters;
        updatedFilters = rest;
      } else {
        updatedFilters[key] = "";
      }
    } else {
      if (key === "kmRange") {
        const { [key]: _, ...rest } = updatedFilters;
        updatedFilters = { ...rest, kmDa: value[0], kmA: value[1] };
      } else if (key === "immatricolazioneRange") {
        const { [key]: _, ...rest } = updatedFilters;
        updatedFilters = { ...rest, annoDa: value[0], annoA: value[1] };
      } else if (key === "prezzoRange") {
        const { [key]: _, ...rest } = updatedFilters;
        updatedFilters = { ...rest, prezzoDa: value[0], prezzoA: value[1] };
      } else {
        updatedFilters[key] = value;
      }
    }

    // Remove empty filters
    Object.keys(updatedFilters).forEach((key) => {
      if (updatedFilters[key] === "") {
        delete updatedFilters[key];
      }
    });

    const query = new URLSearchParams(updatedFilters).toString();
    router.push(`/${pageFrom}?${query}`);
  };

  const getStep = (valueRange: [number, number]) => {
    const maxValue = Math.max(...valueRange);
    if (maxValue <= 30000) {
      return 100;
    } else if (maxValue <= 70000) {
      return 1000;
    } else {
      return 2000;
    }
  };

  const handleSelectChange =
    (setter: Function, key: string) => (value: string) => {
      setter(value);
      handleFilterChange(key, value);
    };

  const handleClearFilters = () => {
    setMarca("");
    setModello("");
    setAlimentazione("");
    setCambio("");
    setPrezzoRange([minMaxPrezzo[0], minMaxPrezzo[1]]);
    setKmRange([minMaxKm[0], minMaxKm[1]]);
    setImmatricolazioneRange([
      minMaxImmatricolazione[0],
      minMaxImmatricolazione[1],
    ]);
    setTipoVeicolo("none");
    router.replace(`/${pageFrom}`);
  };

  return (
    <>
      <div className="bg-secondary rounded-lg ">
        <h4 className="font-bold text-3xl  p-4">Filtra</h4>

        <Accordion type="multiple" className="p-4">
          <AccordionItem value="marca">
            <AccordionTrigger className="pb-0">
              Marca e modello
            </AccordionTrigger>
            <div className="flex flex-wrap gap-2 mb-4">
              {marca && marca !== "none" && (
                <Badge variant="outline" className="text-xs px-3 py-1">
                  {marcaList.find((item) => item.codice === marca)?.marca ||
                    marca}
                </Badge>
              )}
              {modello && modello !== "none" && (
                <Badge variant="outline" className="text-xs px-3 py-1">
                  {modello}
                </Badge>
              )}
            </div>
            <AccordionContent className="flex flex-col gap-y-3">
              <Select
                value={marca}
                onValueChange={(value) => {
                  setMarca(value);
                  setModello(""); // Reset modello on marca change
                  handleFilterChange("marca", value);
                }}
              >
                <SelectTrigger id="marca__select">
                  <SelectValue placeholder="Marca" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Tutte le Marche</SelectItem>
                  {marcaList
                    .filter((item) => item.marca && item.codice)
                    .map((item, index) => (
                      <SelectItem
                        key={index}
                        value={item.codice || `unknown-marca-${index}`}
                      >
                        {item.marca || "Marca sconosciuta"} ({item.count || 0})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>

              <Select
                value={modello}
                onValueChange={handleSelectChange(setModello, "modello")}
                disabled={!marca}
              >
                <SelectTrigger id="modello__select">
                  <SelectValue placeholder="Modello" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Tutti i Modelli</SelectItem>
                  {modelloList
                    .filter((item) => item.modello)
                    .map((item, index) => (
                      <SelectItem
                        key={index}
                        value={item.modello || `unknown-modello-${index}`}
                      >
                        {item.modello || "Modello sconosciuto"} (
                        {item.count || 0})
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="alimentazione">
            <AccordionTrigger className="pb-0">Alimentazione</AccordionTrigger>
            <div className="flex flex-wrap gap-2 mb-4">
              {alimentazione && (
                <Badge variant="outline" className="text-xs px-3 py-1">
                  {alimentazione}
                </Badge>
              )}
            </div>
            <AccordionContent>
              <ButtonGroup
                wrap={true}
                className="gap-2"
                value={alimentazione}
                allowDeselect={true}
                onValueChange={(value) => {
                  setAlimentazione(value || "");
                  handleFilterChange("alimentazione", value);
                }}
              >
                {alimentazioneList
                  .filter((item) => item.alimentazione)
                  .map((item, index) => (
                    <ButtonGroupItem
                      key={index}
                      showCheck={false}
                      className="justify-between px-3"
                      value={item.alimentazione}
                      label={`${item.alimentazione} `}
                    />
                  ))}
              </ButtonGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="cambio">
            <AccordionTrigger className="pb-0">Cambio</AccordionTrigger>
            <div className="flex flex-wrap gap-2 mb-4">
              {cambio && (
                <Badge variant="outline" className="text-xs px-3 py-1">
                  {cambio.charAt(0).toUpperCase() +
                    cambio.slice(1).toLowerCase()}
                </Badge>
              )}
            </div>
            <AccordionContent>
              <ButtonGroup
                wrap={true}
                className="gap-2"
                value={cambio}
                allowDeselect={true}
                onValueChange={(value) => {
                  setCambio(value || "");
                  handleFilterChange("cambio", value);
                }}
              >
                {cambioList
                  .filter((item) => item.cambio && item.cambio != "ALTRO")
                  .map((item, index) => (
                    <ButtonGroupItem
                      key={index}
                      showCheck={false}
                      className="justify-between px-3"
                      value={item.cambio}
                      label={`${
                        item.cambio.charAt(0).toUpperCase() +
                        item.cambio.slice(1).toLowerCase()
                      } `}
                    />
                  ))}
              </ButtonGroup>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="immatricolazione">
            <AccordionTrigger className="pb-0">
              Immatricolazione
            </AccordionTrigger>
            <div className="flex flex-wrap gap-2 mb-4">
              {!(
                immatricolazioneRange[0] === minMaxImmatricolazione[0] &&
                immatricolazioneRange[1] === minMaxImmatricolazione[1]
              ) && (
                <Badge variant="outline" className="text-xs px-3 py-1">
                  Immatricolazione {immatricolazioneRange[0]} -{" "}
                  {immatricolazioneRange[1]}
                </Badge>
              )}
            </div>

            <AccordionContent>
              <div className="flex flex-col my-3">
                <div className="flex justify-between my-2">
                  <p className="font-medium">
                    Dal {parseInt(String(immatricolazioneRange[0]))}
                  </p>
                  <p className="font-medium">
                    al {parseInt(String(immatricolazioneRange[1]))}
                  </p>
                </div>
                <SliderRange
                  min={parsedMinMaxImmatricolazione[0]}
                  max={parsedMinMaxImmatricolazione[1]}
                  step={1}
                  value={immatricolazioneRange}
                  onValueCommit={(value) => {
                    handleFilterChange("immatricolazioneRange", value);
                  }}
                  onValueChange={(value) => {
                    setImmatricolazioneRange(value);
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="Chilometri">
            <AccordionTrigger className="pb-0">Chilometri</AccordionTrigger>
            <div className="flex flex-wrap gap-2 mb-4">
              {!(kmRange[0] === minMaxKm[0] && kmRange[1] === minMaxKm[1]) && (
                <Badge variant="outline" className="text-xs px-3 py-1">
                  {parseInt(String(kmRange[0]))} -{" "}
                  {parseInt(String(kmRange[1]))} Km
                </Badge>
              )}
            </div>
            <AccordionContent>
              <div className="flex flex-col my-3">
                <div className="flex justify-between my-2">
                  <p className="font-medium">
                    Da {parseInt(String(kmRange[0]))} Km
                  </p>
                  <p className="font-medium">
                    a {parseInt(String(kmRange[1]))} Km
                  </p>
                </div>
                <SliderRange
                  min={minMaxKm[0]}
                  max={minMaxKm[1]}
                  step={getStep(minMaxKm)}
                  value={kmRange}
                  onValueCommit={(value) => {
                    handleFilterChange("kmRange", value);
                  }}
                  onValueChange={(value) => {
                    setKmRange(value);
                  }}
                  formatLabel={(value) => `${formatPrice(value)}`}
                />
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="prezzo">
            <AccordionTrigger className="pb-0">Prezzo</AccordionTrigger>
            <div className="flex flex-wrap gap-2 mb-4">
              {!(
                prezzoRange[0] === minMaxPrezzo[0] &&
                prezzoRange[1] === minMaxPrezzo[1]
              ) && (
                <Badge variant="outline" className="text-xs px-3 py-1">
                  Prezzo {formatPrice(prezzoRange[0])} -{" "}
                  {formatPrice(prezzoRange[1])}
                </Badge>
              )}
            </div>
            <AccordionContent>
              <div className="flex flex-col my-3">
                <div className="flex justify-between my-2">
                  <p className="font-medium">
                    Da {formatPrice(prezzoRange[0])}
                  </p>
                  <p className="font-medium">a {formatPrice(prezzoRange[1])}</p>
                </div>
                <SliderRange
                  min={minMaxPrezzo[0]}
                  max={minMaxPrezzo[1]}
                  step={getStep(minMaxPrezzo)}
                  value={prezzoRange}
                  onValueCommit={(value) => {
                    handleFilterChange("prezzoRange", value);
                  }}
                  onValueChange={(value) => {
                    setPrezzoRange(value);
                  }}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <button
        onClick={handleClearFilters}
        className="bg-transparent flex flex-row justify-center gap-x-2 py-3 w-full items-center text-centerself-start text-primary"
      >
        <XCircle className="w-4 h-4" />
        Cancella filtri
      </button>
    </>
  );
}
