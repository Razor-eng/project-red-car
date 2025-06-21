  "use client";
  import { FC, useState } from "react";
  import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
  } from "@/components/ui/select";
  import { Check } from "lucide-react";
  import { Slider } from "../ui/slider";

  // Reusable Checkbox Component
  const Checkbox: FC<{
    label: string;
    checked: boolean;
    onToggle: () => void;
  }> = ({ label, checked, onToggle }) => (
    <div
      onClick={onToggle}
      className={`h-12 w-full bg-white border-2 rounded-lg flex justify-center items-center cursor-pointer relative transition-all ${
        checked ? "border-green-600" : "border-none"
      }`}
      aria-label={`Toggle ${label}`}
    >
      {checked && (
        <Check className="absolute w-3 h-3 top-1 right-1 rounded-full text-white bg-[#25B768]" />
      )}
      <span className="text-sm font-semibold text-black">{label}</span>
    </div>
  );

  // Select Field Component
  const SelectField: FC<{
    label: string;
    options: string[];
    value: string;
    noLabel?: boolean;
    onChange: (value: string) => void;
  }> = ({ label, options, value, onChange, noLabel }) => (
    <div className="w-full mb-6">
      {!noLabel && (
        <label className="block text-sm font-bold text-[#757575]">{label}</label>
      )}
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="mt-1 w-full px-4 py-2 bg-white font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-primary flex items-center justify-between">
          <span>{value || label}</span>
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem key={option} value={option.toLowerCase()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  // Main Filter Component
  const FilterComponent: FC = () => {
    // State for filters including select fields
    const [filters, setFilters] = useState({
      transmission: { manual: false, automatic: false },
      fuel: {
        benzina: false,
        diesel: false,
        gpl: false,
        ibrida: false,
        plugIn: false,
        elettrica: false,
      },
      selectedAuto: "",
      selectedModel: "",
      selectedYear: "",
      selectedCategory: "",
    });
    const [kmRange, setKmRange] = useState<number[]>([125000]);
    const [priceRange, setPriceRange] = useState<number[]>([40000]);

    const toggleTransmission = (type: "manual" | "automatic") => {
      setFilters((prev) => ({
        ...prev,
        transmission: { ...prev.transmission, [type]: !prev.transmission[type] },
      }));
    };

    const toggleFuelType = (type: keyof typeof filters.fuel) => {
      setFilters((prev) => ({
        ...prev,
        fuel: { ...prev.fuel, [type]: !prev.fuel[type] },
      }));
    };

    // Handle changes for select fields
    const handleSelectChange =
      (
        field:
          | "selectedAuto"
          | "selectedModel"
          | "selectedYear"
          | "selectedCategory"
      ) =>
      (value: string) => {
        setFilters((prev) => ({
          ...prev,
          [field]: value,
        }));
      };

    return (
      <section className="w-full lg:w-[400px] flex flex-col gap-6 lg:gap-[38px]">
        {/* Filter Form */}
        <div className="w-full h-fit bg-gray-100 p-1 lg:p-6 rounded-lg shadow-lg sticky top-20">
          <h2 className="text-2xl font-bold mb-4">Filtra per</h2>
          <form>
            <div className="">
              <label className="block text-sm font-bold text-[#757575]">
                Auto
              </label>
              <div className="grid grid-cols-2 gap-3 md:gap-6 mt-1">
                <SelectField
                  label="Auto"
                  options={["Mercedes", "BMW", "Audi"]}
                  value={filters.selectedAuto}
                  onChange={handleSelectChange("selectedAuto")}
                  noLabel
                />
                <SelectField
                  label="Modello"
                  options={["Model 1", "Model 2", "Model 3"]}
                  value={filters.selectedModel}
                  onChange={handleSelectChange("selectedModel")}
                  noLabel
                />
              </div>
            </div>

            {/* Transmission */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-[#757575]">
                Cambio
              </label>
              <div className="grid grid-cols-2 gap-3 md:gap-6 mt-1">
                <Checkbox
                  label="Manuale"
                  checked={filters.transmission.manual}
                  onToggle={() => toggleTransmission("manual")}
                />
                <Checkbox
                  label="Automatico"
                  checked={filters.transmission.automatic}
                  onToggle={() => toggleTransmission("automatic")}
                />
              </div>
            </div>

            {/* Fuel Type */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-[#757575]">
                Alimentazione
              </label>
              <div className="grid grid-cols-2 mt-2 gap-3 md:gap-x-6 md:gap-y-4">
                {Object.keys(filters.fuel).map((fuelType) => (
                  <Checkbox
                    key={fuelType}
                    label={fuelType.charAt(0).toUpperCase() + fuelType.slice(1)}
                    checked={filters.fuel[fuelType as keyof typeof filters.fuel]}
                    onToggle={() =>
                      toggleFuelType(fuelType as keyof typeof filters.fuel)
                    }
                  />
                ))}
              </div>
            </div>

            {/* Select Fields */}
            <SelectField
              label="Anno"
              options={["2020", "2021", "2022"]}
              value={filters.selectedYear}
              onChange={handleSelectChange("selectedYear")}
            />
            <SelectField
              label="Categoria"
              options={["SUV", "Sedan", "Hatchback"]}
              value={filters.selectedCategory}
              onChange={handleSelectChange("selectedCategory")}
            />

            {/* Mileage Range */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-[#757575]">
                  Km
                </label>
                <span className="text-sm text-gray-700">
                  Fino a {kmRange[0].toLocaleString()} km
                </span>
              </div>
              <Slider
                id="km"
                min={0}
                max={125000}
                defaultValue={[125000]}
                value={kmRange}
                onValueChange={setKmRange}
              />
            </div>

            {/* Price Range */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-[#757575]">
                Prezzo
              </label>
              <div className="flex justify-between mt-1 text-sm text-gray-700 mb-2">
                <span>Da {priceRange[0].toLocaleString()}€</span>
                <span>a 125.000€</span>
              </div>
              <Slider
                id="price"
                min={40000}
                max={125000}
                defaultValue={[40000]}
                value={priceRange}
                onValueChange={setPriceRange}
              />
            </div>
          </form>
        </div>
      </section>
    );
  };

  export default FilterComponent;
