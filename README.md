# TODO

-   remove lodash deps for size optimization and implement handy functions in faster es6
-   make sure the react-intl/locale-data/<lang> stuff are loaded as a universal component
-   add react hooks when they are ready (apollo-react and hot loader don't barf) also add the eslint plugin to see if we violate te react hooks
-   create manifest.json to be deployed on root

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
