module.exports = async function seedFaqPage(strapi) {
  const existingFaq = await strapi.entityService.findMany(
    "api::faq-page.faq-page"
  );
  if (!Array.isArray(existingFaq) || !existingFaq.length) {
    await strapi.entityService.create("api::faq-page.faq-page", {
      data: {
        faqs: [
          {
            question: "Loren Ipsum?",
            answer:
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
          },
          {
            question: "Consectuetur adipiscing elit?",
            answer: "Sed nisi.",
          },
          {
            question: "Integer nec odio?",
            answer: "Praesent libero.",
          },
          {
            question: "Sed nisi?",
            answer: "Nulla quis sem at nibh elementum imperdiet.",
          },
          {
            question: "Nulla quis sem at nibh elementum imperdiet?",
            answer: "Duis sagittis ipsum. Praesent mauris.",
          },
        ],
        cta: {
          label: "Contattaci",
          url: "/contattaci",
        },
      },
    });

    strapi.log.info("FAQ Page seeded");
  }
};
