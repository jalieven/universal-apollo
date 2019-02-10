import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import Routes from './routes';
import client from './apollo/client';

// offline service worker
OfflinePluginRuntime.install();

const language = navigator.language.split(/[-_]/)[0];

const App = () => (
	<ApolloProvider client={client}>
		<Router>
			<Routes language={language} />
		</Router>
	</ApolloProvider>
);

const render = Root =>
	// will this be the final api for enabling Concurrent React?
	// when will SSR be supported?
	// ReactDOM.createRoot(document.getElementById('root')).hydrate(
	// 	<AppContainer>
	// 		<Root />
	// 	</AppContainer>
	// );
	ReactDOM.hydrate(
		<AppContainer>
			<Root />
		</AppContainer>,
		document.getElementById('root'),
	);

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./routes/index.js', () => {
		render(App);
	});
}

render(App);
