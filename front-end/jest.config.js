// /** @type {import('ts-jest').JestConfigWithTsJest} */
// module.exports = {
//     preset: 'ts-jest',
//     testEnvironment: 'node',
//     transform: {
//       '^.+\\.jsx?$': 'babel-jest',
      
//     }
//   };


module.exports = {
  testEnvironment: 'node', // Assuming you're testing in a browser-like environment
  transform: {
    '^.+\\.jsx?$': 'babel-jest', // Transform JSX files
  },
};
