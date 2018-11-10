import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { ApolloProvider, renderToStringWithData } from 'react-apollo';
import { renderStylesToString } from 'emotion-server';
import { flushChunkNames } from 'react-universal-component/server';
import flushChunks from 'webpack-flush-chunks';
import { StaticRouter as Router } from 'react-router-dom';
import Helmet from 'react-helmet';

import Routes from '../src/routes';
import apolloClient from '../src/apollo/server';

export default ({ clientStats }) => (req, res) => {
	const context = {};
	const App = () => (
		<ApolloProvider client={apolloClient}>
			<Router location={req.url} context={context}>
				<Routes language={req.language} />
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
		// helmet stuff
		const helmet = Helmet.renderStatic();
		const title = helmet.title.toString();
		const meta = helmet.meta.toString();
		const link = helmet.link.toString();
		// ssr emotion styles
		const appWithStyles = renderStylesToString(app);
		// find out which scripts should be included in the page
		const chunkNames = flushChunkNames();
		const { js, styles, cssHash, scripts, stylesheets } = flushChunks(clientStats, {
			chunkNames,
		});
		/* eslint-disable no-console */
		console.log('STATE', JSON.stringify(initialState));
		console.log('PATH', req.path);
		console.log('DYNAMIC CHUNK NAMES RENDERED', chunkNames);
		console.log('SCRIPTS SERVED', scripts);
		console.log('STYLESHEETS SERVED', stylesheets);
		console.log('TITLE', helmet.title.toString());
		/* eslint-enable no-console */
		res.send(`
			<!doctype html>
			<html>
			<head>
				<meta charset="utf-8">
				${link}
				${meta}
				${title}
				${styles}
			</head>
			<body>
				<div id="root">${appWithStyles}</div>
				${stateScript}
				${cssHash}
				${js}
			</body>
			</html>
		`);
	});
};
