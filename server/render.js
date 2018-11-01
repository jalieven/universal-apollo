import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { StaticRouter as Router } from 'react-router-dom';

import Routes from '../src/routes';
import apolloClient from '../src/apollo/server';

export default ({ clientStats }) => (req, res) => {
	const context = {};
	const App = () => (
		<ApolloProvider client={apolloClient}>
			<Router location={req.url} context={context}>
				<Routes />
			</Router>
		</ApolloProvider>
	);
	/* eslint-disable react/no-danger */
	const StateScript = ({ state }) => (
		<script
			dangerouslySetInnerHTML={{
				__html: `window.__APOLLO_STATE__=${JSON.stringify(state).replace(
					/</g,
					'\\u003c',
				)};`,
			}}
		/>
	);
	/* eslint-enable react/no-danger */

	renderToStringWithData(<App />).then(app => {
		// get initial apollo state and convert it into a script string
		const initialState = apolloClient.extract();
		const state = <StateScript state={initialState} />;
		const stateScript = ReactDOMServer.renderToStaticMarkup(state);
		// find out which scripts should be included in the page
		const chunkNames = flushChunkNames();
		const { js, styles, cssHash, scripts, stylesheets } = flushChunks(clientStats, {
			chunkNames,
		});

		/* eslint-disable no-console */
		console.log('PATH', req.path);
		console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames);
		console.log('SCRIPTS SERVED', scripts);
		console.log('STYLESHEETS SERVED', stylesheets);
		/* eslint-enable no-console */
		res.send(`
			<!doctype html>
			<html>
			<head>
				<meta charset="utf-8">
				<title>react-universal-component-boilerplate</title>
				${styles}
			</head>
			<body>
				<div id="root">${app}</div>
				${stateScript}
				${cssHash}
				${js}
			</body>
			</html>
		`);
	});
};
