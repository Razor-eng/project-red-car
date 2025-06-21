"use strict";
const seedGlobalContent = require("./seed/seedGlobal");
const seedHomePage = require("./seed/seedHomePage");
const seedAcquistaPage = require("./seed/seedAquistaPage");
const seedChiSiamoPage = require("./seed/seedChiSiamoPage");
const seedDoveSiamoPage = require("./seed/seedDoveSiamoPage");
const seedContattaciPage = require("./seed/seedContattaciPage");
const seedFaqPage = require("./seed/seedFaqPage");
const seedNoleggiaPage = require("./seed/seedNoleggiaPage");

module.exports = {
  register() {},

  async bootstrap({ strapi }) {
    strapi.log.info("Bootstrap started");
    await enableAllPublicFindPermissions(strapi);

    await seedGlobalContent(strapi);
    await seedHomePage(strapi);
    await seedAcquistaPage(strapi);
    await seedChiSiamoPage(strapi);
    await seedDoveSiamoPage(strapi);
    await seedContattaciPage(strapi);
    await seedFaqPage(strapi);
    await seedNoleggiaPage(strapi);
    strapi.log.info("Bootstrap completed");
  },
};

// This function enables all "find" and "findOne" permissions for the public role
async function enableAllPublicFindPermissions(strapi) {
  const publicRole = await strapi.db
    .query("plugin::users-permissions.role")
    .findOne({
      where: { type: "public" },
    });

  if (!publicRole) {
    strapi.log.warn("Public role not found");
    return;
  }

  const contentTypes = Object.values(strapi.contentTypes).filter((ct) =>
    ct.uid.startsWith("api::")
  );

  for (const contentType of contentTypes) {
    const uid = contentType.uid;
    const actions = ["find", "findOne"];

    for (const action of actions) {
      const fullAction = `${uid}.${action}`;

      const existingPermission = await strapi.db
        .query("plugin::users-permissions.permission")
        .findOne({
          where: {
            role: publicRole.id,
            action: fullAction,
          },
        });

      if (!existingPermission) {
        await strapi.db.query("plugin::users-permissions.permission").create({
          data: {
            role: publicRole.id,
            action: fullAction,
            enabled: true,
          },
        });
        strapi.log.info(`Created permission ${fullAction} for public role.`);
      } else if (!existingPermission.enabled) {
        await strapi.db.query("plugin::users-permissions.permission").update({
          where: { id: existingPermission.id },
          data: { enabled: true },
        });
        strapi.log.info(
          `Enabled existing permission ${fullAction} for public role.`
        );
      }
    }
  }

  strapi.log.info("Enabled all find/findOne permissions for public role.");
}
