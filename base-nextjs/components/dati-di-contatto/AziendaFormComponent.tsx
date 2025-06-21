import { Input } from "@/components/ui/input";
import React, { FC, useState } from "react";

const AziendaFormComponent: FC = () => {
  const [cognome, setCognome] = useState("");
  const [nome, setNome] = useState("");
  const [dataDiNascita, setDataDiNascita] = useState("");
  const [luogoDiNascita, setLuogoDiNascita] = useState("");

  const [regioneSociale, setRegioneSociale] = useState("");
  const [pIva, setPIva] = useState("");

  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [indirizzoDiResidenza, setIndirizzoDiResidenza] = useState("");
  const [comune, setComune] = useState("");
  const [cap, setCap] = useState("");

  return (
    <form className="mt-[30px] md:mt-[68px] mx-auto">
      {/* Dati personali Inputs */}
      <div className="">
        <label
          htmlFor="auto"
          className="block font-bold text-lg md:text-[20px]"
        >
          Dati personali
        </label>
        <div className="mt-[21px] grid md:grid-cols-2 gap-x-[36px] md:gap-y-[18px] gap-y-[10px]">
          <Input
            className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
            value={cognome}
            onChange={(e) => setCognome(e.target.value)}
            placeholder="cognome"
          />
          <Input
            className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
            value={dataDiNascita}
            onChange={(e) => setDataDiNascita(e.target.value)}
            placeholder="Data di nascita"
          />
          <Input
            className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
            value={luogoDiNascita}
            onChange={(e) => setLuogoDiNascita(e.target.value)}
            placeholder="Luogo di nascita"
          />
          <Input
            className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="nome"
          />
        </div>
      </div>

      {/* Dati aziendali Inputs */}
      <div className="mt-[34px]">
        <label
          htmlFor="auto"
          className="block font-bold text-lg md:text-[20px]"
        >
          Dati aziendali
        </label>
        <div className="mt-[21px] grid md:grid-cols-2 gap-x-[36px] gap-y-[10px] md:gap-y-[18px]">
          <Input
            className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
            value={regioneSociale}
            onChange={(e) => setRegioneSociale(e.target.value)}
            placeholder="Regione sociale"
          />
          <Input
            className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
            value={pIva}
            onChange={(e) => setPIva(e.target.value)}
            placeholder="P.Iva"
          />
        </div>
      </div>

      {/* Recapiti Inputs */}
      <div className="mt-[34px]">
        <label
          htmlFor="auto"
          className="block font-bold text-lg md:text-[20px]"
        >
          Recapiti
        </label>
        <div className="grid md:grid-rows-2 gap-y-[10px] md:gap-y-[18px]">
          <div className="mt-[21px] grid md:grid-cols-2 gap-x-[36px] gap-y-[10px] md:gap-y-[18px]">
            <Input
              className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              className="w-full xl:w-[478px] h-[50px] border-2 border-primary rounded-[10px]"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              placeholder="Telefono"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-x-[25px] gap-y-[10px] md:gap-y-[18px]">
            <Input
              className="w-full xl:w-[314px] h-[50px] border-2 border-primary rounded-[10px]"
              value={indirizzoDiResidenza}
              onChange={(e) => setIndirizzoDiResidenza(e.target.value)}
              placeholder="Indirizzo di residenza"
            />
            <Input
              className="w-full xl:w-[314px] h-[50px] border-2 border-primary rounded-[10px]"
              value={comune}
              onChange={(e) => setComune(e.target.value)}
              placeholder="Comune"
            />
            <Input
              className="w-full xl:w-[314px] h-[50px] border-2 border-primary rounded-[10px]"
              value={cap}
              onChange={(e) => setCap(e.target.value)}
              placeholder="CAP"
            />
          </div>
        </div>
      </div>
    </form>
  );
};

export default AziendaFormComponent;
