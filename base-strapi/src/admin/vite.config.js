const { mergeConfig } = require('vite');

module.exports = (config) => {
  // Important: always return the modified config
  return mergeConfig(config, {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
    server: {
      // bind to all interfaces
      host: true,
      // allow your custom host
      // allowedHosts: ['localhost', 'tenant-1.loc', 'tenant-2.loc', 'commercianti.eunders.org'],
      allowedHosts: true,

    },
  });
};
