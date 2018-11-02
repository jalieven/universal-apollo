require('colors');
const express = require('express');
const apicache = require('apicache');
const compression = require('compression');
const webpack = require('webpack');
const noFavicon = require('express-no-favicons');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackHotServerMiddleware = require('webpack-hot-server-middleware');

const clientConfig = require('./../webpack/client.dev');
const serverConfig = require('./../webpack/server.dev');
const clientConfigProd = require('./../webpack/client.prod');
const serverConfigProd = require('./../webpack/server.prod');
const config = require('./config');

const { publicPath } = clientConfig.output;
const outputPath = clientConfig.output.path;
const DEV = process.env.NODE_ENV === 'development';
const app = express();
app.use(noFavicon());

let isBuilt = false;

const done = () =>
	!isBuilt &&
	app.listen(3000, () => {
		isBuilt = true;
		/* eslint-disable no-console */
		console.log('BUILD COMPLETE -- Listening @ http://localhost:3000'.magenta);
		/* eslint-enable no-console */
	});

if (DEV) {
	const compiler = webpack([clientConfig, serverConfig]);
	const clientCompiler = compiler.compilers[0];
	const options = { publicPath, stats: { colors: true } };
	const devMiddleware = webpackDevMiddleware(compiler, options);

	app.use(devMiddleware);
	app.use(webpackHotMiddleware(clientCompiler));
	app.use(webpackHotServerMiddleware(compiler));

	devMiddleware.waitUntilValid(done);
} else {
	webpack([clientConfigProd, serverConfigProd]).run((err, stats) => {
		const clientStats = stats.toJson().children[0];
		/* eslint-disable global-require */
		const serverRender = require('./../buildServer/main.js').default;
		/* eslint-enable global-require */
		const cache = apicache.options({
			enabled: config.cache.enabled,
			debug: config.cache.debug,
			defaultDuration: config.cache.duration,
			statusCodes: {
				exclude: [404, 403],
			},
		}).middleware;
		app.use(compression());
		app.use(publicPath, cache(), express.static(outputPath));
		app.get('/', cache('1 minute'), serverRender({ clientStats }));
		app.get('/episodes/:episode', cache('10 seconds'), serverRender({ clientStats }));
		done();
	});
}
