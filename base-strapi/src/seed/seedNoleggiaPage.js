module.exports = async function seedNoleggiaPage(strapi) {
  const existingNollegia = await strapi.entityService.findMany(
    "api::nollegia-page.nollegia-page"
  );
  if (!Array.isArray(existingNollegia) || !existingNollegia.length) {
    await strapi.entityService.create("api::nollegia-page.nollegia-page", {
      data: {
        result: [
          {
            title: "Lynk e Co 01",
            description: "1.5 Phev 261cv Auto fwd MY23",
            price: "32.000",
            category: "SUV",
            transmission: "Automatico",
            fuelType: "Ibrida Benzina",
            year: "10/2023",
            mileage: 0,
          },
          {
            title: "Lynk e Co 02",
            description: "1.5 Phev 261cv Auto fwd MY23",
            price: "32.000",
            category: "SUV",
            transmission: "Automatico",
            fuelType: "Ibrida Benzina",
            year: "10/2023",
            mileage: 0,
          },
        ],
      },
    });

    strapi.log.info("Noleggia Page seeded");
  }
};
