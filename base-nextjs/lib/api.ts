// lib/api.ts

// ENV-safe STRAPI URL init
const STRAPI_URL =
  typeof window === "undefined"
    ? process.env.STRAPI_INTERNAL_URL
    : process.env.NEXT_PUBLIC_STRAPI_URL;

if (!STRAPI_URL) {
  throw new Error(
    "STRAPI_URL is not defined. Check your environment variables."
  );
}

// Generic fetch helper
async function fetchFromStrapi(path: string) {
  const res = await fetch(`${STRAPI_URL}${path}`, { cache: "no-store" });

  if (!res.ok) {
    const errorText = await res.text();
    console.error(`[Strapi Fetch Error] ${path}:`, res.status, errorText);
    throw new Error(`Failed to fetch from ${path}`);
  }

  const json = await res.json();
  return json.data;
}

// getGlobalData
export async function getGlobalData() {
  return await fetchFromStrapi("/api/global?populate=*");
}

// getFAQPageData
export async function getFAQPageData() {
  const rawData = await fetchFromStrapi("/api/faq-page?populate=*");

  return formatFAQData(rawData);
}

// Format FAQ helper
function formatFAQData(rawData: any) {
  return {
    id: rawData.id,
    heroImage: {
      url: rawData.heroImage?.url || "",
    },
    faqs:
      rawData.faqs?.map((faq: any) => ({
        id: faq.id,
        question: faq.question,
        answer: faq.answer,
      })) || [],
    cta: {
      label: rawData.cta?.label,
      url: rawData.cta?.url,
    },
  };
}

// getHomePageData (single call, all populated)
export async function getHomePageData() {
  const query = new URLSearchParams({
    "populate[heroSection][populate]": "offers.imageUrl",
    "populate[offerSection][populate]": "offers.imageUrl",
    "populate[popularCarsSection][populate]": "popularCars.imageUrl",
    "populate[lowConsumptionCarsSection][populate]": "cars.imageUrl",
    "populate[reviewSection][populate]": "reviews.imageUrl",
    "populate[brandSection][populate]": "brands.imageUrl",
  }).toString();

  const data = await fetchFromStrapi(`/api/home-page?${query}`);

  return {
    heroSection: data.heroSection,
    offerSection: data.offerSection,
    popularCarsSection: data.popularCarsSection,
    lowConsumptionCarsSection: data.lowConsumptionCarsSection,
    reviewSection: data.reviewSection,
    brandSection: data.brandSection,
  };
}

// getChiSiamoData
export async function getChiSiamoData() {
  const [chiSiamoRes, globalRes] = await Promise.all([
    fetchFromStrapi(
      "/api/chi-siamo-page?populate[0]=imageUrl&populate[1]=carSection.imageUrl"
    ),
    fetchFromStrapi("/api/global?populate=logo"),
  ]);

  return {
    ...chiSiamoRes,
    logo: globalRes?.logo,
  };
}

// getDoveSiamoData
export async function getDoveSiamoData() {
  return await fetchFromStrapi("/api/dove-siamo-page?populate=*");
}

// getContattaciPageData
export async function getContattaciPageData() {
  return await fetchFromStrapi("/api/contattaci-page?populate=*");
}

// getReviewSectionData
export async function getReviewSectionData() {
  const data = await fetchFromStrapi(
    "/api/home-page?populate[reviewSection][populate]=reviews.imageUrl"
  );
  return data.reviewSection;
}
