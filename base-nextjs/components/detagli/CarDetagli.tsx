"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import RequestModal from "../shared/RequestModal";
import { formatDate } from "@/utils/format-date";
import { useRouter } from "next/navigation";
import { addMonths, format } from "date-fns";
import { formatPrice } from "@/utils/format-price";
import { Input } from "@/components/ui/input";

interface CarDetails {
  isCarDetails?: boolean;
  data?: any;
}

const CarDetagli: FC<CarDetails> = ({ isCarDetails, data }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);

  // Dummy data for car details
  const carDetails = [
    { title: "Porte", detail: data?.porte ?? "N/A" },
    {
      title: "Potenza",
      detail: `${data?.kw ?? "N/A"} Kw - ${data?.cv ?? "N/A"} Cv`,
    },
    { title: "Chilometraggio", detail: data?.km ?? "N/A" },
    { title: "Cambio", detail: data?.cambio ?? "N/A" },
    { title: "Colore", detail: data?.colore ?? "N/A" },
    {
      title: "Immatricolata",
      detail: formatDate(data?.immatricolazione) ?? "N/A",
    },
    { title: "Alimentazione", detail: data?.alimentazione ?? "N/A" },
    { title: "Cilindrata", detail: `${data?.cilindrata ?? "N/A"} cc` },
  ];

  const images = data?.images || [];

  const [km, setKm] = useState("20000");
  const [durata, setDurata] = useState("24");
  const [anticipo, setAnticipo] = useState("3000");
  const [cauzione, setCauzione] = useState("0");
  const [monthlyRate, setMonthlyRate] = useState(""); // Default or initial monthly rate
  const [ammortamento, setAmmortamento] = useState(""); // Default or initial ammortamento
  const [maxAnticipo, setMaxAnticipo] = useState(0);
  const [count, setCount] = useState(0);
  const [error, setError] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [titleModal, setTitleModal] = useState("Richiedi un preventivo");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleKmChange = (newValue: any) => {
    setKm(newValue);
    //onChangeKm && onChangeKm(newValue);
  };

  const handleDurataChange = (newValue: any) => {
    setDurata(newValue);
    //onChangeDurata && onChangeDurata(newValue);
  };

  const handleCauzioneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setCauzione("");
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setCauzione(value);
        //onChangeCauzione && onChangeCauzione(value);
        setError("");
      }
    }
  };

  const handleAnticipoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (value === "") {
      setAnticipo("");
    } else {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue) && parsedValue <= maxAnticipo) {
        setAnticipo(value);
        //onChangeAnticipo && onChangeAnticipo(value);
        setError("");
      } else {
        setError(
          "Il valore massimo dell'anticipo è " + formatPrice(maxAnticipo, true)
        );
      }
    }
  };

  useEffect(() => {
    if (km && durata && anticipo && cauzione) {
      fetchMonthlyRate();
    }
  }, [km, durata, anticipo, cauzione]);

  useEffect(() => {
    if (durata && maxAnticipo) {
      // maxAnticipo = rata mensile * durata - 30%
      let maxAnticipo = parseFloat(monthlyRate) * +durata;
      // maxAnticipo = maxAnticipo - 30%
      maxAnticipo = maxAnticipo / 2;
      setMaxAnticipo(maxAnticipo);
      console.log("maxAnticipo:", maxAnticipo);
    }
  }, [durata]);

  const fetchMonthlyRate = async () => {
    setLoading(true);
    let kmSel = km;

    if (km === "40000") {
      kmSel = "SUPER1";
    }

    const today = new Date();
    const dataInizio = format(today, "yyyy-MM-dd");
    const dataFine = format(addMonths(today, +durata), "yyyy-MM-dd");

    console.log("Cauzione", cauzione);

    const params = {
      comando: "CALNOL",
      acconto: anticipo,
      cauzione: cauzione,
      articolo: data.articolo2,
      category: kmSel,
      duration: durata,
      dataInizio,
      dataFine,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/noleggio`,
        {
          method: "POST",
          body: JSON.stringify(params),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);

      if (!response.ok) {
        setLoading(false);
        throw new Error("Network response was not ok");
      }

      const dataresp = await response.json();
      setMonthlyRate(dataresp.IMPRATA);
      setAmmortamento(
        dataresp.AMMORTAMENTO?.length
          ? dataresp.AMMORTAMENTO[dataresp.AMMORTAMENTO.length - 1]
              .VALORE_RESIDUO
          : null
      );

      if (count < 1) {
        setCount(count + 1);

        let maxAnticipo = parseFloat(dataresp.IMPRATA) * +durata;
        maxAnticipo = maxAnticipo / 2;
        setMaxAnticipo(maxAnticipo);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  const thumbnailRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (thumbnailRefs.current[currentImageIndex]) {
      thumbnailRefs.current[currentImageIndex]?.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [currentImageIndex]);

  return (
    <div className="w-full xl:w-[1180px] py-[10px] md:px-[18px] md:py-[18px] flex flex-col lg:flex-row items-center justify-between rounded-[10px] md:bg-[#F0F0F0]">
      <div className="w-full md:w-[697px] flex flex-col gap-[20px]">
        {/* Mobile title */}
        <div className="flex md:hidden flex-col items-center justify-center">
          <h2 className="font-bold text-[30px]">
            {data?.marca ?? "Marca"} {data?.modello ?? "Modello"}
          </h2>
        </div>

        {/* Main image */}
        <div className="rounded-[5px] h-[350px] relative">
          <Image
            src={
              images[currentImageIndex]?.image?.trim()
                ? images[currentImageIndex].image
                : "/images/car-fallback.png"
            }
            alt="car"
            width={600}
            height={600}
            priority
            className="rounded-[5px] w-full h-full object-contain"
          />
          {images.length > 1 && (
            <div className="w-full absolute bottom-10 flex items-end justify-between px-[16px]">
              <button
                onClick={handlePrevImage}
                className="flex items-center justify-center w-[40px] h-[40px] bg-primary rounded-[5px] hover:bg-primary/80"
              >
                <ChevronLeft className="text-white size-6" />
              </button>
              <button
                onClick={handleNextImage}
                className="flex items-center justify-center w-[40px] h-[40px] bg-primary rounded-[5px] hover:bg-primary/80"
              >
                <ChevronRight className="text-white size-6" />
              </button>
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="mt-4 px-2">
            <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth">
              {images.map((item: any, index: number) => (
                <div
                  key={index}
                  ref={(el) => {
                    thumbnailRefs.current[index] = el;
                  }}
                  className={`relative cursor-pointer rounded-[5px] overflow-hidden border-2 transition-all duration-200 ease-in-out
            ${
              index === currentImageIndex
                ? "border-primary shadow-sm shadow-primary scale-95"
                : "border-transparent hover:scale-105"
            }
            min-w-[100px] w-[100px] h-[68px] flex-shrink-0`}
                  onClick={() => setCurrentImageIndex(index)}
                >
                  <Image
                    src={
                      item.image?.trim()
                        ? item.image
                        : "/images/car-fallback.png"
                    }
                    alt={`thumbnail-${index}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Car details or thumbnail grid */}
        {!isCarDetails && (
          <div className="grid grid-cols-2 md:grid-cols-4 px-[20px] md:px-[10px] md:py-1 gap-y-[20px]">
            {carDetails.map((item, index) => (
              <div
                key={index}
                className="flex flex-col items-start text-[20px] md:text-base"
              >
                <h2 className="text-gray-400">{item.title}</h2>
                <p>{item.detail}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="w-full md:w-[423px] md:h-[493px] flex flex-col justify-between gap-[20px] px-[10px] md:px-0">
        <div>
          {/* Car Name and Model */}
          <div className="hidden md:flex flex-col">
            <h2 className="font-bold text-[34px]">{data?.marca}</h2>
            <p className="text-[20px]">{data.modello}</p>
          </div>

          {isCarDetails ? (
            <div className="mt-4 flex flex-col gap-[20px]">
              <div className="px-[19px] md:px-0 grid grid-cols-2 md:grid-cols-2 gap-y-3 md:gap-y-2">
                {carDetails.map((item, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-start text-[20px] md:text-base"
                  >
                    <h2 className="text-gray-400">{item.title}</h2>
                    <p className="">{item.detail}</p>
                  </div>
                ))}
              </div>
              <div className="w-full px-3 md:px-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-gray-400 font-semibold">
                    Comprala subito per
                  </h4>
                  <h3 className="font-extrabold text-[30px]">
                    {" "}
                    {formatPrice(data.prezzo)}{" "}
                  </h3>
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="grid  grid-cols-2 max-sm:grid-cols-1 max-sm:gap-y-3 gap-3 gap-x-3">
                <div>
                  <label
                    htmlFor="km-select"
                    className="block text-sm font-medium text-gray-700"
                  >
                    KM annui
                  </label>
                  <Select value={km} onValueChange={handleKmChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Km annui" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="1" value="10000">
                        10.000
                      </SelectItem>
                      <SelectItem key="2" value="15000">
                        15.000
                      </SelectItem>
                      <SelectItem key="3" value="20000">
                        20.000
                      </SelectItem>
                      <SelectItem key="4" value="30000">
                        30.000
                      </SelectItem>
                      <SelectItem key="5" value="40000">
                        40.000
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="durata-select"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Durata (mesi)
                  </label>
                  <Select value={durata} onValueChange={handleDurataChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Mesi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem key="1" value="12">
                        12
                      </SelectItem>
                      <SelectItem key="2" value="18">
                        18
                      </SelectItem>
                      <SelectItem key="3" value="24">
                        24
                      </SelectItem>
                      <SelectItem key="4" value="30">
                        30
                      </SelectItem>
                      <SelectItem key="5" value="36">
                        36
                      </SelectItem>
                      <SelectItem key="6" value="42">
                        42
                      </SelectItem>
                      <SelectItem key="7" value="48">
                        48
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label
                    htmlFor="anticipo-input"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Anticipo
                  </label>
                  <Input
                    type="text"
                    placeholder="Anticipo"
                    value={anticipo}
                    onChange={handleAnticipoChange}
                    id="anticipo-input"
                  />
                </div>
                <div>
                  <label
                    htmlFor="anticipo-input"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Cauzione
                  </label>
                  <Input
                    type="text"
                    placeholder="Cauzione"
                    value={cauzione}
                    onChange={handleCauzioneChange}
                    id="cauzione-input"
                  />
                </div>
              </div>
              <p className="text-red-500">{error}</p>

              {/* Pricing */}
              <div className="py-[30px] text-primary flex items-end justify-center">
                {loading ? (
                  <div className="animate-pulse">
                    <div className="h-[64px] w-[200px] bg-gray-300 rounded"></div>
                  </div>
                ) : (
                  <>
                    <h2 className="text-8xl font-extrabold">{monthlyRate}€</h2>
                    <p className="text-lg">/mese</p>
                  </>
                )}
              </div>

              <div className="px-[20px] grid grid-cols-3 items-center justify-around font-extrabold text-[18px] gap-[30px] md:gap-[50px]">
                <h2>{km} Km annui</h2>
                <h2>{durata} Mesi</h2>
                <h2>{formatPrice(anticipo)} Anticipo</h2>
              </div>
            </>
          )}
        </div>

        {/* Request Button */}
        <div className="flex items-center justify-center">
          <button
            onClick={() => setShowModal(true)}
            className="w-full h-[70px] md:h-[50px] bg-primary text-white font-semibold rounded-[5px] hover:bg-primary/80 text-xl md:text-base transition duration-300 ease-in-out"
          >
            {isCarDetails ? "Richiedi un preventivo" : "Richiedi Informazioni"}
          </button>
        </div>
        <RequestModal open={showModal} onClose={() => setShowModal(false)} />
      </div>
    </div>
  );
};

export default CarDetagli;
