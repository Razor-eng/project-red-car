const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL;

const useStrapiImage = (url: string) => {
  return `${STRAPI_BASE_URL}${url}`;
};

export default useStrapiImage;
