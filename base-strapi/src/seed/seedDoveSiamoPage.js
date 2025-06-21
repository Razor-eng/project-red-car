module.exports = async function seedDoveSiamoPage(strapi) {
  const existingDoveSiamo = await strapi.entityService.findMany(
    "api::dove-siamo-page.dove-siamo-page"
  );
  if (!Array.isArray(existingDoveSiamo) || !existingDoveSiamo.length) {
    await strapi.entityService.create("api::dove-siamo-page.dove-siamo-page", {
      data: {
        title: "La nostra Sede",
        description: "Ci troviamo in Via delle Pere, 98, Caserta (CE)",
        address: "Via delle Pere 98, Caserta, CE 81100",
        latitude: 41.072621,
        longitude: 14.332095,
      },
    });

    strapi.log.info("Dove Siamo Page seeded");
  }
};
