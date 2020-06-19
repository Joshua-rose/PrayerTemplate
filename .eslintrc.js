module.exports = {
    "env": {
        "browser": true,
        "es2020": true,
        "node": true
    },
    "extends": [
        "plugin:react/recommended",
        "airbnb"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".ts", ".tsx"] }],
        "import/extensions": [2, {
            tsx: "never",
            jsx: "never",
            ts: "never",
            js: "never",
        }],
        "max-len": [1, 200],
        "no-unused-vars": "off",
        "@typescript-eslint/no-unused-vars": ["warn", {
            "vars": "all",
            "args": "after-used",
            "ignoreRestSiblings": false
        }],
        "react/no-array-index-key": 0,
        "import/prefer-default-export": 1,
        "linebreak-style":0,
        "react/prop-types": [1, {
            ignore: [
                'children',
            ]
        }]
    }
};
