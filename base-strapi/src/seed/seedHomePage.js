module.exports = async function seedHomePage(strapi) {
  const existingHome = await strapi.entityService.findMany(
    "api::home-page.home-page"
  );
  if (!Array.isArray(existingHome) || !existingHome.length) {
    await strapi.entityService.create("api::home-page.home-page", {
      data: {
        heroSection: {
          searchTitle: "Quale auto cerchi?",
          searchPlaceholder: "Marca, modello, allestimento...",
          ctaButton: "Vai al parco veicoli",
          button: "Vedi",
          offers: [
            {
              title: "Offerta 1",
              description: "Spiegazione offerta 1",
              url: "offerta-1",
            },
            {
              title: "Offerta 2",
              description: "Spiegazione offerta 2",
              url: "offerta-2",
            },
            {
              title: "Offerta 3",
              description: "Spiegazione offerta 3",
              url: "offerta-3",
            },
          ],
        },
        offerSection: {
          offers: [
            {
              title: "Prodotto 1",
              description: "Descrizione prodotto 1",
              price: "26000€",
              monthlyPrice: "Da 280€ al mese",
              url: "itroen-c3-feel-t506963",
            },
            {
              title: "Prodotto 2",
              description: "Descrizione prodotto 2",
              price: "28000€",
              monthlyPrice: "Da 300€ al mese",
              url: "offerta-2",
            },
            {
              title: "Prodotto 3",
              description: "Descrizione prodotto 3",
              price: "30000€",
              monthlyPrice: "Da 320€ al mese",
              url: "offerta-3",
            },
          ],
        },
        popularCarsSection: {
          popularCars: [
            {
              title: "Fiat",
              description: "Panda",
            },
            {
              title: "Fiat",
              description: "Tipo",
            },
            {
              title: "Toyota",
              description: "Yaris",
            },
            {
              title: "Volkswagen",
              description: "Golf",
            },
            {
              title: "Alfa Romeo",
              description: "Giulia",
            },
            {
              title: "Renault",
              description: "Clio",
            },
          ],
        },
        lowConsumptionCarsSection: {
          cars: [
            {
              title: "Lancia",
              description: "Ypsilon",
            },
            {
              title: "Volkswagen",
              description: "Polo",
            },
            {
              title: "Renault",
              description: "Zoe",
            },
          ],
        },
        reviewSection: {
          reviews: [
            {
              name: "Laura Rossi",
              description:
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
              rating: 4.3,
            },
            {
              name: "Giovanna Rossi",
              description: "Esperienza positiva e servizio impeccabile.",
              rating: 4.8,
            },
            {
              name: "Random name",
              description: "Esperienza positiva e servizio impeccabile.",
              rating: 4.8,
            },
            {
              name: "Random user",
              description: "Esperienza positiva e servizio impeccabile.",
              rating: 4.8,
            },
          ],
        },
        brandSection: {
          brands: [
            { name: "Brand 1" },
            { name: "Brand 2" },
            { name: "Brand 3" },
            { name: "Brand 4" },
            { name: "Brand 5" },
            { name: "Brand 6" },
            { name: "Brand 7" },
            { name: "Brand 8" },
            { name: "Brand 9" },
            { name: "Brand 10" },
          ],
        },
      },
    });

    strapi.log.info("Bootstrapped Home Page.");
  }
};
