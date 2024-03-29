module.exports = {
  "env": {
    "browser": true,
    "amd": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "overrides": [
  ],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "warn",
      2
    ],
    "quotes": [
      "warn",
      "double",
      { "allowTemplateLiterals": true }
    ],
    "semi": [
      "error",
      "never"
    ],
    "eqeqeq": "error",
    "no-trailing-spaces": "warn",
    "no-unused-vars": "warn",
    "no-undef": "warn",
    "object-curly-spacing": [
      "error", "always"
    ],
    "arrow-spacing": [
      "error", { "before": true, "after": true }
    ],
    "no-console": 0,
    "no-useless-catch": 0,
    "react/prop-types": 0
  },
  "settings": {
    "react": {
      "version": "detect"
    }
  }
}
