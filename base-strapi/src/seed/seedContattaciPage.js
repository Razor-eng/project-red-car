module.exports = async function seedContattaciPage(strapi) {
  const existingContattaci = await strapi.entityService.findMany(
    "api::contattaci-page.contattaci-page"
  );
  if (!Array.isArray(existingContattaci) || !existingContattaci.length) {
    await strapi.entityService.create("api::contattaci-page.contattaci-page", {
      data: {
        email: "info@redcar.com",
        phone: "+123456789",
      },
    });

    strapi.log.info("Contattaci Page seeded");
  }
};
