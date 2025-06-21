export interface Offer {
  id: number;
  title: string;
  description: string;
  imageUrl: {
    url: string;
  };
  price?: string;
  monthlyPrice?: string;
  url?: string;
}

// Hero Section
export interface HeroSectionData {
  searchTitle: string;
  searchPlaceholder: string;
  ctaButton: string;
  button: string;
  offers: Offer[];
}

//Offer Section
export interface OfferSectionData {
  offers: Offer[];
}

//Popular Cars Section
export interface PopularCarsSectionType {
  popularCars: Offer[];
}

//Low Consumption Cars Section
export interface LowConsumptionCarsSectionType {
  cars: Offer[];
}

// Review Section
export interface reviewSectionType {
  reviews: {
    name: string;
    description: string;
    imageUrl: {
      url: string;
    };
    rating: number;
  }[];
}

// Brand Section
export interface BrandSectionType {
  brands: {
    name?: string;
    imageUrl: {
      url: string;
    };
  }[];
}

export interface HomePageData {
  heroSection?: HeroSectionData;
  offerSection?: OfferSectionData;
  popularCarsSection?: PopularCarsSectionType;
  lowConsumptionCarsSection?: LowConsumptionCarsSectionType;
  reviewSection?: reviewSectionType;
  brandSection?: BrandSectionType;
}
