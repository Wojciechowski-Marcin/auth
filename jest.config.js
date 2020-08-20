module.exports = {
  preset: '@shelf/jest-mongodb',
  roots: ['<rootDir>/src'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/{d,D}ata{-,_,""}{t,T}ypes/**',
    '!src/index.ts',
  ],
  coverageThreshold: {
    global: {
      statements: process.env.CI_LAST_COVERAGE || 0,
    },
  },
};
