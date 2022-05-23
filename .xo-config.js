module.exports = {
  prettier: true,
  space: true,
  overrides: [
    {
      files: "packages/client/**/*.jsx",
      envs: ["es2021", "browser"],
      extends: "xo-react",
      rules: {
        "react/react-in-jsx-scope": "off",
        "unicorn/filename-case": [
          "error",
          {
            case: "pascalCase"
          },
        ],
        "node/file-extension-in-import": "off",
        "import/extensions": "off",
      },
    },
    {
      files: "packages/**/*.test.js",
      envs: ["es2021", "jest"],
    },
    {
      files: "packages/db/**/*.js",
      rules: {
        "unicorn/prefer-module": "off",
      },
    },
  ],
};
