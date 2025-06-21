import React from "react";
import CarDetagli from "@/components/detagli/CarDetagli";
import ReviewSection from "@/components/Homepage/ReviewSection/ReviewSection";
import VeicoloDettagliScheda from "@/components/car-dettagli/OppureFilter";
import { getReviewSectionData } from "@/lib/api";

interface Props {
  params: { id: string };
}

async function fetchVehicleDetails(
  slug: string,
  tipoUtenteListino: string
): Promise<{ veicoloData: any; related: any[]; reviewSection: any }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  const identifier = slug.includes("-") ? slug.split("-").pop() : slug;

  const vehicleUrl = `${apiUrl}/api/articoli/veicolo/${identifier?.toUpperCase()}?tipoUtenteListino=${tipoUtenteListino}`;

  const [vehicleResponse, reviewSection] = await Promise.all([
    fetch(vehicleUrl, { next: { revalidate: 60 } }),
    getReviewSectionData(),
  ]);

  if (!vehicleResponse.ok) {
    throw new Error("Failed to fetch vehicle details");
  }

  const vehicleData = await vehicleResponse.json();

  return {
    veicoloData: vehicleData.data,
    related: [],
    reviewSection,
  };
}

export default async function CarDettagliPage({ params }: Props) {
  const { id } = params;
  const { veicoloData, reviewSection } = await fetchVehicleDetails(id, "PRI");

  return (
    <div className="py-[19px] md:py-[98px] w-full flex flex-col items-center justify-center px-6">
      <CarDetagli isCarDetails data={veicoloData} />
      <VeicoloDettagliScheda data={veicoloData} />
      {reviewSection && <ReviewSection {...reviewSection} />}
    </div>
  );
}
