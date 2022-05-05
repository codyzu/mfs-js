module.exports = {
  prettier: true,
  space: 2,
  overrides: [
    {
      files: "packages/client/**/*.js",
      envs: ['es2021', 'browser'],
      extends: "xo-react",
      rules: {
        "react/react-in-jsx-scope": "off",
        "unicorn/filename-case": [
          "error",
          {
            cases: {
              camelCase: true,
              pascalCase: true,
            },
          },
        ],
        "node/file-extension-in-import": "off",
        "import/extensions": "off"
      },
      // space: 2
    },
    {
      files: "packages/client/**/*.test.js",
      envs: ['es2021', 'jest'],
    },
  ],
};
