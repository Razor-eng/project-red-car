// types/faq.ts

export interface FAQPageData {
  heroImage: {
    url: string;
  };
  faqs: FAQItem[];
  cta: {
    label: string;
    url: string;
  };
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}
