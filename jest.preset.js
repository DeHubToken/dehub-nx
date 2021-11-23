const nxPreset = require('@nrwl/jest/preset');

module.exports = {
  ...nxPreset,
  moduleNameMapper: {
    '^lodash-es$': 'lodash',
    '^@dehub/shared/assets/dehub/(.*)$':
      '<rootDir>/../../libs/shared/assets/dehub/src/lib/$1',
    '^@dehub/shared/assets/freya/(.*)$':
      '<rootDir>/../../libs/shared/assets/freya/src/lib/$1',
  },
};
