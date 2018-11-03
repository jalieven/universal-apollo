module.exports = {
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			generators: true,
			experimentalObjectRestSpread: true,
		},
		sourceType: 'module',
		allowImportExportEverywhere: false,
	},
	plugins: ['flowtype'],
	extends: ['airbnb', 'plugin:flowtype/recommended'],
	settings: {
		flowtype: {
			onlyFilesWithFlowAnnotation: true,
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.json', '.css', '.styl'],
			},
		},
	},
	globals: {
		window: true,
		document: true,
		navigator: true,
		__dirname: true,
		__DEV__: true,
		CONFIG: true,
		process: true,
		jest: true,
		describe: true,
		test: true,
		it: true,
		expect: true,
		beforeEach: true,
		fetch: true,
		alert: true,
	},
	rules: {
		indent: ['error', 'tab'],
		'no-tabs': 0,
		'import/extensions': [
			'error',
			'always',
			{
				js: 'never',
				jsx: 'never',
				styl: 'never',
				css: 'never',
			},
		],
		'no-shadow': 0,
		'no-use-before-define': 0,
		'no-param-reassign': 0,
		'function-paren-newline': ['error', 'consistent'],
		'react/prop-types': 0,
		'react/no-render-return-value': 0,
		'no-confusing-arrow': 0,
		'implicit-arrow-linebreak': 0,
		'no-underscore-dangle': 0,
		'no-plusplus': 0,
		camelcase: 1,
		'prefer-template': 1,
		'react/no-array-index-key': 1,
		'global-require': 1,
		'react/jsx-indent': [1, 'tab'],
		'dot-notation': 1,
		'import/no-named-default': 1,
		'no-unused-vars': 1,
		'flowtype/no-weak-types': 1,
		'consistent-return': 1,
		'import/prefer-default-export': 1,
		'no-console': 1,
		'jsx-a11y/no-static-element-interactions': 1,
		'no-case-declarations': 1,
		'no-template-curly-in-string': 1,
		'react/jsx-no-target-blank': 1,
		semi: [2, 'always'],
		'flowtype/semi': [2, 'never'],
		'operator-linebreak': ['error', 'after'],
		'jsx-quotes': [2, 'prefer-double'],
		'object-curly-newline': 0,
		'react/jsx-indent-props': [2, 'tab'],
		'react/jsx-filename-extension': [2, { extensions: ['.jsx', '.js'] }],
		'spaced-comment': [2, 'always', { markers: ['?'] }],
		'arrow-parens': [2, 'as-needed', { requireForBlockBody: false }],
		'brace-style': [2, '1tbs'],
		'import/no-unresolved': [1, { commonjs: true, caseSensitive: true }],
		'no-unused-expressions': [
			2,
			{
				allowShortCircuit: true,
				allowTernary: true,
				allowTaggedTemplates: true,
			},
		],
		'import/no-extraneous-dependencies': [
			1,
			{
				devDependencies: true,
				optionalDependencies: true,
				peerDependencies: true,
			},
		],
		'comma-dangle': 0,
		'max-len': [
			'error',
			{
				code: 100,
				tabWidth: 4,
				ignoreUrls: true,
				ignoreComments: true,
				ignoreRegExpLiterals: true,
				ignoreStrings: true,
				ignoreTemplateLiterals: true,
			},
		],
		'react/sort-comp': [
			1,
			{
				order: [
					'propTypes',
					'props',
					'state',
					'defaultProps',
					'contextTypes',
					'childContextTypes',
					'getChildContext',
					'static-methods',
					'lifecycle',
					'everything-else',
					'render',
				],
			},
		],
		'linebreak-style': 0,
	},
};
