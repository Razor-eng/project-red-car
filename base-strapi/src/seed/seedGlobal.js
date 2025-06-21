module.exports = async function seedGlobalContent(strapi) {
  const existing = await strapi.entityService.findMany("api::global.global");

  if (existing?.length) {
    strapi.log.info("⚠️ Global content already exists.");
    return;
  }

  await strapi.entityService.create("api::global.global", {
    data: {
      navLinks: [
        { label: "Acquista", url: "/acquista" },
        { label: "Noleggia", url: "/noleggia" },
        { label: "Chi siamo", url: "/chi-siamo" },
        { label: "Contattaci", url: "/contattaci" },
        { label: "Dove siamo", url: "/dove-siamo" },
        { label: "FAQ", url: "/faq" },
      ],
      footerLinks: [
        { label: "Privacy Policy", url: "/privacy-policy" },
        { label: "Cookie Policy", url: "/cookie-policy" },
        { label: "Termini e condizioni", url: "/termini-condizioni" },
        { label: "Legal", url: "/legal" },
        { label: "Chiamaci", url: "/chiamaci" },
        { label: "Informazioni", url: "/informazioni" },
      ],
      address: "Via Tescione, 10, 81100 Caserta (CE)",
      email: "info@redcar.com",
      phone: "+123456789",
      companyName: "RedCar speed Vehicle S.r.l.",
      vatNumber: "PI/CF 374893809209",
      socialCapital: "Cap.Soc. €10.000 i.v.",
      theme: "blu",
    },
  });

  strapi.log.info("Global content seeded.");
};
