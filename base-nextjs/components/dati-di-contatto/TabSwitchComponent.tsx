"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC, useState } from "react";
import AziendaFormComponent from "./AziendaFormComponent";
import PrivatoFormComponent from "./PrivatoFormComponent";

const TabSwitchComponent: FC = () => {
  const [activeTab, setActiveTab] = useState("azienda");

  return (
    <section className="my-[58px] xl:my-[143px] px-4 flex items-center justify-center">
      {/* Contact Switch Tab */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center">
          <TabsList className="w-[390px] md:w-[456px] h-[46px] mx-auto border-2 border-primary rounded-[10px] px-[7px] py-[10px] bg-white text-white">
            <TabsTrigger
              value="privato"
              className={`font-semibold text-center w-full rounded-md ${
                activeTab === "privato"
                  ? "!bg-primary !text-white"
                  : "!text-primary"
              }`}
            >
              Privato
            </TabsTrigger>
            <TabsTrigger
              value="azienda"
              className={`font-semibold text-center w-full rounded-md ${
                activeTab === "azienda"
                  ? "!bg-primary !text-white"
                  : "!text-primary"
              }`}
            >
              Azienda
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="privato">
          <PrivatoFormComponent />
        </TabsContent>
        <TabsContent value="azienda">
          <AziendaFormComponent />
        </TabsContent>
      </Tabs>
    </section>
  );
};

export default TabSwitchComponent;
