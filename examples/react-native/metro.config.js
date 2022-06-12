const path = require('node:path');

const packagePath = path.resolve(
  require.resolve('@admob-plus/react-native/package.json'),
  '..'
);

module.exports = {
  resolver: {
    nodeModulesPaths: ["./node_modules", packagePath],
  },
  watchFolders: [packagePath],
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};
