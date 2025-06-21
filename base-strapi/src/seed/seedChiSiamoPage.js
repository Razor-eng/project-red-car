module.exports = async function seedChiSiamoPage(strapi) {
  const existingChiSiamo = await strapi.entityService.findMany(
    "api::chi-siamo-page.chi-siamo-page"
  );
  if (!Array.isArray(existingChiSiamo) || !existingChiSiamo.length) {
    await strapi.entityService.create("api::chi-siamo-page.chi-siamo-page", {
      data: {
        title: "Lorem et ipsum",
        description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris congue
        volutpat enim. Etiam rutrum tempus rutrum. Etiam at velit purus. Ut
        purus tortor, vulputate eu sapien pulvinar, dictum varius turpis.
        Nullam at ante fringilla, sagittis purus finibus, hendrerit nunc.
        Integer cursus lorem leo, nec fringilla mauris eleifend sed. Integer
        aliquet urna vel turpis tincidunt, imperdiet scelerisque mi volutpat.`,
        carSection: [
          {
            title: "Lorem et ipsum",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            congue volutpat enim. Etiam rutrum tempus rutrum. Etiam at velit
            purus. Ut purus tortor, vulputate eu sapien pulvinar, dictum varius
            turpis. Nullam at ante fringilla, sagittis purus finibus, hendrerit
            nunc. Integer cursus lorem leo, nec fringilla mauris eleifend sed.
            Integer aliquet urna vel turpis tincidunt, imperdiet scelerisque mi
            volutpat.`,
          },
          {
            title: "Lorem et ipsum",
            description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
            congue volutpat enim. Etiam rutrum tempus rutrum. Etiam at velit
            purus. Ut purus tortor, vulputate eu sapien pulvinar, dictum varius
            turpis. Nullam at ante fringilla, sagittis purus finibus, hendrerit
            nunc. Integer cursus lorem leo, nec fringilla mauris eleifend sed.
            Integer aliquet urna vel turpis tincidunt, imperdiet scelerisque mi
            volutpat.`,
          },
        ],
        quote:
          "Ut purus tortor, vulputate eu sapien pulvinar, dictum varius turpis.",
      },
    });

    strapi.log.info("Chi Siamo Page seeded");
  }
};
