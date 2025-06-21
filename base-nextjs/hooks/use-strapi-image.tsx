const STRAPI_BASE_URL = typeof window === 'undefined'
? process.env.STRAPI_INTERNAL_URL // server-side, inside container
: process.env.NEXT_PUBLIC_STRAPI_URL;

const useStrapiImage = (url: string) => {
  return `${STRAPI_BASE_URL}${url}`;
};

export default useStrapiImage;
