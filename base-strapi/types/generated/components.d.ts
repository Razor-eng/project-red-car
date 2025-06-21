import type { Schema, Struct } from '@strapi/strapi';

export interface AcquistaCarDetail extends Struct.ComponentSchema {
  collectionName: 'components_acquista_car_details';
  info: {
    description: '';
    displayName: 'CarDetail';
  };
  attributes: {
    category: Schema.Attribute.String;
    description: Schema.Attribute.Text;
    fuelType: Schema.Attribute.String;
    imageUrl: Schema.Attribute.Media<'images' | 'files'>;
    mileage: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          min: 0;
        },
        number
      >;
    price: Schema.Attribute.String;
    title: Schema.Attribute.String;
    transmission: Schema.Attribute.String;
    year: Schema.Attribute.String;
  };
}

export interface ChiSiamoCarSection extends Struct.ComponentSchema {
  collectionName: 'components_chi_siamo_car_sections';
  info: {
    description: '';
    displayName: 'CarSection';
  };
  attributes: {
    description: Schema.Attribute.Text;
    imageUrl: Schema.Attribute.Media<'images' | 'files'>;
    title: Schema.Attribute.String;
  };
}

export interface CommonCarDetail extends Struct.ComponentSchema {
  collectionName: 'components_common_car_details';
  info: {
    description: '';
    displayName: 'Car Detail';
  };
  attributes: {
    label: Schema.Attribute.String;
    value: Schema.Attribute.String;
  };
}

export interface CommonContent extends Struct.ComponentSchema {
  collectionName: 'components_common_contents';
  info: {
    displayName: 'Content';
  };
  attributes: {
    description: Schema.Attribute.String;
    label: Schema.Attribute.String;
  };
}

export interface CommonDetail extends Struct.ComponentSchema {
  collectionName: 'components_common_details';
  info: {
    description: '';
    displayName: 'Detail';
  };
  attributes: {
    content: Schema.Attribute.Component<'common.content', true>;
    label: Schema.Attribute.String;
  };
}

export interface CommonNavLink extends Struct.ComponentSchema {
  collectionName: 'components_common_nav_links';
  info: {
    displayName: 'NavLink';
    icon: 'code';
  };
  attributes: {
    label: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface CommonSocialLink extends Struct.ComponentSchema {
  collectionName: 'components_common_social_links';
  info: {
    description: '';
    displayName: 'SocialLink';
  };
  attributes: {
    imageUrl: Schema.Attribute.Media<'images'>;
    url: Schema.Attribute.String;
  };
}

export interface FaqFaq extends Struct.ComponentSchema {
  collectionName: 'components_faq_faqs';
  info: {
    description: '';
    displayName: 'FAQ';
    icon: 'bulletList';
  };
  attributes: {
    answer: Schema.Attribute.Text;
    question: Schema.Attribute.String;
  };
}

export interface HomeBrand extends Struct.ComponentSchema {
  collectionName: 'components_home_brands';
  info: {
    description: '';
    displayName: 'Brand';
  };
  attributes: {
    imageUrl: Schema.Attribute.Media<'images' | 'files'>;
    name: Schema.Attribute.String;
  };
}

export interface HomeBrandSection extends Struct.ComponentSchema {
  collectionName: 'components_home_brand_sections';
  info: {
    description: '';
    displayName: 'BrandSection';
  };
  attributes: {
    brands: Schema.Attribute.Component<'home.brand', true>;
  };
}

export interface HomeHeroSection extends Struct.ComponentSchema {
  collectionName: 'components_home_hero_sections';
  info: {
    description: '';
    displayName: 'HeroSection';
  };
  attributes: {
    button: Schema.Attribute.String;
    ctaButton: Schema.Attribute.String;
    offers: Schema.Attribute.Component<'home.offer', true>;
    searchPlaceholder: Schema.Attribute.String;
    searchTitle: Schema.Attribute.String;
  };
}

export interface HomeLowConsumptionCarsSection extends Struct.ComponentSchema {
  collectionName: 'components_home_low_consumption_cars_sections';
  info: {
    description: '';
    displayName: 'LowConsumptionCarSection';
  };
  attributes: {
    cars: Schema.Attribute.Component<'home.offer', true>;
  };
}

export interface HomeOffer extends Struct.ComponentSchema {
  collectionName: 'components_home_offers';
  info: {
    description: '';
    displayName: 'Offer';
  };
  attributes: {
    description: Schema.Attribute.String;
    imageUrl: Schema.Attribute.Media<'images' | 'files'>;
    monthlyPrice: Schema.Attribute.String;
    price: Schema.Attribute.String;
    title: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface HomeOfferSection extends Struct.ComponentSchema {
  collectionName: 'components_home_offer_sections';
  info: {
    description: '';
    displayName: 'OfferSection';
  };
  attributes: {
    offers: Schema.Attribute.Component<'home.offer', true>;
  };
}

export interface HomePopularCarSection extends Struct.ComponentSchema {
  collectionName: 'components_home_popular_car_sections';
  info: {
    displayName: 'PopularCarSection';
  };
  attributes: {
    popularCars: Schema.Attribute.Component<'home.offer', true>;
  };
}

export interface HomeReview extends Struct.ComponentSchema {
  collectionName: 'components_home_reviews';
  info: {
    description: '';
    displayName: 'Review';
  };
  attributes: {
    description: Schema.Attribute.Text;
    imageUrl: Schema.Attribute.Media<'images' | 'files'>;
    name: Schema.Attribute.String;
    rating: Schema.Attribute.Decimal &
      Schema.Attribute.SetMinMax<
        {
          max: 5;
          min: 0;
        },
        number
      > &
      Schema.Attribute.DefaultTo<0>;
  };
}

export interface HomeReviewSection extends Struct.ComponentSchema {
  collectionName: 'components_home_review_sections';
  info: {
    displayName: 'ReviewSection';
  };
  attributes: {
    reviews: Schema.Attribute.Component<'home.review', true>;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'acquista.car-detail': AcquistaCarDetail;
      'chi-siamo.car-section': ChiSiamoCarSection;
      'common.car-detail': CommonCarDetail;
      'common.content': CommonContent;
      'common.detail': CommonDetail;
      'common.nav-link': CommonNavLink;
      'common.social-link': CommonSocialLink;
      'faq.faq': FaqFaq;
      'home.brand': HomeBrand;
      'home.brand-section': HomeBrandSection;
      'home.hero-section': HomeHeroSection;
      'home.low-consumption-cars-section': HomeLowConsumptionCarsSection;
      'home.offer': HomeOffer;
      'home.offer-section': HomeOfferSection;
      'home.popular-car-section': HomePopularCarSection;
      'home.review': HomeReview;
      'home.review-section': HomeReviewSection;
    }
  }
}
