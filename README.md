# TODO

-   remove lodash deps for size optimization and implement handy functions in faster es6
-   make sure the react-intl/locale-data/<lang> stuff are loaded as a universal component
-   how to remove navigator.language for selecting locales out of critical server path

# Startup

For development (hot reload):

```bash
npm start
```

For production optimized code:

```bash
npm run start:prod
```

# i18n

Install and translate:
https://www.codeandweb.com/babeledit/download
Then place translations into src/translations/<lang>.json
