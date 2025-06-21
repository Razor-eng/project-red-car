// types/global.ts

export interface GlobalData {
  companyName: string;
  vatNumber: string;
  socialCapital: string;
  address: string;
  theme: "blu" | "rossa" | "verde" | "viola" | "arancione" | "dark";
  logo: {
    url: string;
  };
  footerLogo: {
    url: string;
  };
  navLinks: {
    id: string;
    label: string;
    url: string;
  }[];
  footerLinks?: {
    id: string;
    label: string;
    url: string;
  }[];
  socialLinks?: {
    id: string;
    url: string;
    imageUrl: string; // Image URL for social media links
  }[];
  email?: string;
  phone?: string;
}

// Chi Siamo Type
export interface ChiSiamoType {
  title: string;
  description: string;
  imageUrl: {
    url: string;
  };
  carSection: {
    title: string;
    description: string;
    imageUrl: {
      url: string;
    };
  }[];
  quote: string;
  logo?: {
    url: string;
  };
}

//Dove Siamo Type
export interface DoveSiamoType {
  title: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  imageUrl: {
    url: string;
  };
}

// Contattaci Type
export interface ContattaciType {
  email: string;
  phone: string;
  imageUrl: {
    url: string;
  };
}
