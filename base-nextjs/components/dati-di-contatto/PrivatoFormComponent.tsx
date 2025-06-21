import React, { FC, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

const PrivatoFormComponent: FC = () => {
  const [cognome, setCognome] = useState("");
  const [nome, setNome] = useState("");
  const [dataDiNascita, setDataDiNascita] = useState("");
  const [luogoDiNascita, setLuogoDiNascita] = useState("");
  const [sesso, setSesso] = useState("");
  const [codiceFiscale, setCodiceFiscale] = useState("");

  const [indirizzoDiResidenza, setIndirizzoDiResidenza] = useState("");
  const [localita, setLocalita] = useState("");
  const [cap, setCap] = useState("");

  return (
    <form className="mt-[30px] xl:mt-[68px] mx-auto">
      {/* Dati personali Inputs */}
      <div className="">
        <label
          htmlFor="auto"
          className="block font-bold text-lg md:text-[20px]"
        >
          Dati personali
        </label>
        <div className="mt-[21px] grid md:grid-cols-2 gap-x-[36px] gap-y-[18px]">
          <Input
            className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            placeholder="cognome"
          />
          <Input
            className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="nome"
          />
          <Input
            className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
            value={luogoDiNascita}
            onChange={(e) => setLuogoDiNascita(e.target.value)}
            placeholder="Luogo di nascita"
          />
          <Input
            className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
            value={dataDiNascita}
            onChange={(e) => setDataDiNascita(e.target.value)}
            placeholder="Data di nascita"
          />
          <Input
            className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
            value={sesso}
            onChange={(e) => setSesso(e.target.value)}
            placeholder="Sesso"
          />
          <Input
            className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
            value={codiceFiscale}
            onChange={(e) => setCodiceFiscale(e.target.value)}
            placeholder="Codice Fiscale"
          />
        </div>
      </div>

      {/* Dati indirizzo Inputs */}
      <div className="mt-[34px]">
        <label
          htmlFor="auto"
          className="block font-bold text-lg md:text-[20px]"
        >
          Dati indirizzo
        </label>
        <div className="grid md:grid-rows-2 gap-y-[18px]">
          <div className="mt-[21px] grid md:grid-cols-2 gap-x-[36px] gap-y-[18px]">
            <Input
              className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
              value={indirizzoDiResidenza}
              onChange={(e) => setIndirizzoDiResidenza(e.target.value)}
              placeholder="Indirizzo di residenza"
            />
            <Input
              className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
              value={localita}
              onChange={(e) => setLocalita(e.target.value)}
              placeholder="Localita"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-x-[25px] gap-y-[18px]">
            <Select>
              <SelectTrigger className="w-full xl:w-[314px] h-[50px] border-2 border-primary rounded-[10px]">
                <span>Nazione</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">A</SelectItem>
                <SelectItem value="b">B</SelectItem>
                <SelectItem value="c">C</SelectItem>
              </SelectContent>
            </Select>
            <Input
              className="w-full xl:w-[314px] h-[50px] border-2 border-primary rounded-[10px]"
              value={cap}
              onChange={(e) => setCap(e.target.value)}
              placeholder="CAP"
            />
            <Select>
              <SelectTrigger className="w-full xl:w-[314px] h-[50px] border-2 border-primary rounded-[10px]">
                <span>Stato / Regione</span>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="a">A</SelectItem>
                <SelectItem value="b">B</SelectItem>
                <SelectItem value="c">C</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PrivatoFormComponent;
