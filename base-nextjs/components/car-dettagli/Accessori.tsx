import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { FC } from "react";

const Accessori: FC = () => {
  const accessories = Array.from({ length: 12 }, (_, index) => ({
    title: `Accessori ${index + 1}`,
    desc: "Lorem et ipsum",
  }));

  return (
    <div className="my-5 w-full xl:my-[72px] xl:w-[1180px] mx-auto bg-white xl:bg-[#F0F0F0] rounded-[10px] py-5 md:p-[25px] flex flex-col gap-5 md:gap-[20px]">
      {/* Title (Desktop Only) */}
      <h2 className="text-[24px] md:text-[30px] font-semibold hidden md:block">
        Accessori
      </h2>

      {/* Desktop View Grid */}
      <div className="hidden md:grid grid-cols-2 gap-4">
        {accessories.map((item, index) => (
          <div
            key={index}
            className="w-full h-[52px] px-4 py-2 rounded-[5px] flex items-center gap-4 bg-[#DDDDDD]"
          >
            <h3 className="text-[18px] font-bold">{item.title}</h3>
            <p className="text-[18px] text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Mobile View Dropdown */}
      <div className="block md:hidden">
        <Select>
          <SelectTrigger className="w-full h-[57px] border-2 border-primary rounded-[10px] px-[18px] py-[10px] text-left">
            <SelectValue placeholder="Accessori" />
          </SelectTrigger>
          <SelectContent>
            {accessories.map((item, index) => (
              <SelectItem key={index} value={`accessori-${index}`}>
                {item.title} - {item.desc}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default Accessori;
