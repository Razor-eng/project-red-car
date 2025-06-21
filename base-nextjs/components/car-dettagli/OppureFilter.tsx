import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import Image from "next/image";
import React, { FC } from "react";

const OppureFilter: FC = () => {
  const filters = [
    {
      label: "motore",
      options: ["Benzina", "Diesel", "Elettrico", "Ibrido"],
    },
    {
      label: "carrozzeria",
      options: ["SUV", "Berlina", "Coupé", "Station Wagon"],
    },
    {
      label: "prestazioni",
      options: ["Alta", "Media", "Bassa"],
    },
    {
      label: "consumi",
      options: ["Economico", "Medio", "Elevato"],
    },
  ];

  return (
    <div className="w-full max-w-[1180px] flex flex-wrap gap-4 justify-center md:justify-between">
      {filters.map((filter, index) => (
        <Select key={index}>
          <SelectTrigger className="w-full sm:w-[calc(50%-0.5rem)] md:w-[282px] h-[57px] px-4 py-2 rounded-[10px] border-2 border-primary flex items-center justify-between gap-2 transition hover:shadow-md">
            <div className="flex items-center gap-2">
              {/* Image */}
              <Image
                src={`/icons/${filter.label}.png`}
                alt={filter.label}
                width={36}
                height={32}
                className="h-[32px] w-[36px] object-contain"
              />
              {/* Label */}
              <span className="text-muted-foreground text-lg md:text-[22px] capitalize">
                {filter.label}
              </span>
            </div>
          </SelectTrigger>
          <SelectContent>
            {filter.options.map((option, idx) => (
              <SelectItem value={option.toLowerCase()} key={idx}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ))}
    </div>
  );
};

export default OppureFilter;
