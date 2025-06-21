"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { MinusIcon, PlusIcon } from "lucide-react";
import Link from "next/link";
import React, { FC, useState } from "react";

interface FAQComponentProps {
  faqs: { id: number; question: string; answer: string }[];
  cta: { label: string; url: string };
}

const FAQComponent: FC<FAQComponentProps> = ({ faqs, cta }) => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  console.log(faqs);

  return (
    <section className="w-full xl:w-[1093px] mx-auto my-10 xl:my-[112px]">
      <div className="max-w-full mx-auto space-y-6 mb-[96px]">
        <h1 className="text-4xl font-extrabold text-center md:text-left tracking-tight">
          FAQ
        </h1>
        <p className="mt-2 text-base font-medium text-center md:text-left border-b border-zinc-300 pb-6">
          Tutto quello che devi sapere {`sull'inziativa`}. Non trovi una
          risposta? <span className="underline">Chatta con il team</span>
        </p>

        {/* Iteration of all the FAQs */}
        <div className="w-full rounded-md divide-y divide-zinc-300 border-b border-zinc-300">
          {faqs.map((item) => {
            const isOpen = openItem === item.id;

            return (
              <Collapsible
                key={item.id}
                open={isOpen}
                onOpenChange={() =>
                  setOpenItem((prev) => (prev === item.id ? null : item.id))
                }
              >
                <CollapsibleTrigger className="flex w-full justify-between items-center py-4 text-left font-bold md:font-semibold">
                  <span>{item.question}</span>
                  <span className="text-xl font-bold border rounded-full text-muted-foreground border-muted-foreground p-2">
                    {isOpen ? <MinusIcon /> : <PlusIcon />}
                  </span>
                </CollapsibleTrigger>
                <CollapsibleContent className="transition-all duration-300 ease-in-out pb-4">
                  {item.answer}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
        </div>
      </div>

      {/* Contattaci Button */}
      <div className="flex flex-col items-center justify-center">
        <p className="font-normal text-xl text-center md:text-base">
          Non hai trovato quello che cercavi? Nesson problema...
        </p>

        {/* Redirect to the contact page */}
        <Link
          href={cta.url}
          className="bg-primary hover:opacity-85 text-white text-xl md:text-base font-semibold text-center px-[38px] py-[10px] w-full lg:w-[334px] h-[66px] md:h-[44px] rounded-[5px] mt-[24px] gap-3 flex items-center justify-center"
        >
          {cta.label} <span className="text-[20px]">{`>`}</span>
        </Link>
      </div>
    </section>
  );
};

export default FAQComponent;
