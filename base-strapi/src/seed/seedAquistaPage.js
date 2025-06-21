module.exports = async function seedAcquistaPage(strapi) {
  const existingAcquista = await strapi.entityService.findMany(
    "api::acquista-page.acquista-page"
  );
  if (!Array.isArray(existingAcquista) || !existingAcquista.length) {
    const cars = [
      {
        title: "Lynk e Co 01",
        description: "1.5 Phev 261cv Auto fwd MY23",
        price: "32.000",
        category: "SUV",
        transmission: "Automatico",
        fuelType: "Ibrida Benzina",
        year: "10/2023",
        mileage: "0",
      },
      {
        title: "Lynk e Co 02",
        description: "1.5 Phev 261cv Auto fwd MY23",
        price: "34.000",
        category: "SUV",
        transmission: "Automatico",
        fuelType: "Ibrida Benzina",
        year: "09/2023",
        mileage: "0",
      },
      {
        title: "Lynk e Co 01",
        description: "1.5 Phev 261cv Auto fwd MY23",
        price: "30.500",
        category: "SUV",
        transmission: "Automatico",
        fuelType: "Ibrida Benzina",
        year: "08/2023",
        mileage: "0",
      },
    ];

    await strapi.entityService.create("api::acquista-page.acquista-page", {
      data: {
        result: cars,
      },
    });

    strapi.log.info("Acquista Page seeded with car entries");
  }
};
