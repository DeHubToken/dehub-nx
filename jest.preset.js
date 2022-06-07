const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    '^@dehub/shared/asset/dehub/(.*)$':
      '<rootDir>/../../libs/shared/asset/dehub/src/lib/$1',
    '^@dehub/shared/asset/freya/(.*)$':
      '<rootDir>/../../libs/shared/asset/freya/src/lib/$1',
  },
};
