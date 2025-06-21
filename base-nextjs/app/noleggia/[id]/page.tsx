import CarDetagli from "@/components/detagli/CarDetagli";
import DettagliAccordion from "@/components/detagli/DettagliAccordion";
import DettagliContactForm from "@/components/detagli/DettagliContactForm";
import ReviewSection from "@/components/Homepage/ReviewSection/ReviewSection";
import { getReviewSectionData } from "@/lib/api";
import React from "react";

interface Props {
  params: { id: string };
}

async function fetchVehicleDetails(
  slug: string,
  tipoUtenteListino: string
): Promise<{ veicoloData: any; related: any[] }> {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL!;
  const identifier = slug.includes("-") ? slug.split("-").pop() : slug;

  const vehicleUrl = `${apiUrl}/api/articoli/veicolo/${identifier?.toUpperCase()}?tipoUtenteListino=${tipoUtenteListino}`;

  const [vehicleResponse] = await Promise.all([
    fetch(vehicleUrl, { next: { revalidate: 60 } }),
  ]);

  if (!vehicleResponse.ok) {
    throw new Error("Failed to fetch vehicle details");
  }

  const vehicleData = await vehicleResponse.json();
  return { veicoloData: vehicleData.data, related: [] };
}

export default async function NoleggioPageDetail({ params }: Props) {
  const { id } = params;

  // Fetch vehicle and review data
  const [vehicleResult, reviewSection] = await Promise.all([
    fetchVehicleDetails(id, "PRI"),
    getReviewSectionData(),
  ]);

  const { veicoloData } = vehicleResult;

  return (
    <div className="py-[19px] md:py-[98px] w-full flex flex-col items-center justify-center px-6">
      {/* Car Information */}
      <CarDetagli data={veicoloData} />

      {/* Dettagli Accordion */}
      <DettagliAccordion veicolo={veicoloData} />

      {/* Contact Form */}
      <DettagliContactForm />

      {/* Recensioni Section */}
      {reviewSection && <ReviewSection {...reviewSection} isDettagli />}
    </div>
  );
}
