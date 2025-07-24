const nextJest = require('next/jest');

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  // === SETUP FILES ===
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  // === MODULE PATHS ===
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/components/(.*)$': '<rootDir>/components/$1',
    '^@/lib/(.*)$': '<rootDir>/lib/$1',
    '^@/types/(.*)$': '<rootDir>/types/$1',
    '^@/hooks/(.*)$': '<rootDir>/hooks/$1',
    '^@/styles/(.*)$': '<rootDir>/styles/$1',
  },

  // === TEST ENVIRONMENT ===
  testEnvironment: 'jest-environment-jsdom',

  // === TEST PATTERNS ===
  testMatch: [
    '<rootDir>/**/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/**/*.(test|spec).{js,jsx,ts,tsx}',
  ],

  // === IGNORE PATTERNS ===
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/', '<rootDir>/e2e/'],

  // === TRANSFORM CONFIGURATION ===
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },

  // === MODULE FILE EXTENSIONS ===
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

  // === COVERAGE CONFIGURATION ===
  collectCoverage: false,
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    'hooks/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/coverage/**',
    '!**/*.config.{js,ts}',
    '!**/index.{js,ts}',
  ],

  // === COVERAGE THRESHOLDS ===
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },

  // === COVERAGE REPORTERS ===
  coverageReporters: ['text', 'lcov', 'html', 'json-summary'],

  // === GLOBALS ===
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
    },
  },

  // === CLEAR MOCKS ===
  clearMocks: true,

  // === VERBOSE OUTPUT ===
  verbose: true,

  // === WATCH PLUGINS ===
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],

  // === SETUP FILES ===
  setupFiles: ['<rootDir>/jest.polyfills.js'],

  // === MODULE MOCK ===
  moduleNameMapping: {
    // Handle CSS imports (with CSS modules)
    '\\.module\\.(css|sass|scss)$': 'identity-obj-proxy',

    // Handle CSS imports (without CSS modules)
    '\\.(css|sass|scss)$': '<rootDir>/__mocks__/styleMock.js',

    // Handle image imports
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',

    // Handle module aliases
    '^@/(.*)$': '<rootDir>/$1',
  },

  // === TEST TIMEOUT ===
  testTimeout: 10000,

  // === CACHE DIRECTORY ===
  cacheDirectory: '<rootDir>/.jest-cache',
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig);
