module.exports = ({ env }) => ({
  upload: {
    config: {
      provider: "local",
      sizeLimit: 10000000, // Move here, directly under config
      providerOptions: {
        // provider-specific options, empty for 'local'
      },
    },
  },
});
