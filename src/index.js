import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { ApolloProvider } from 'react-apollo';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';

import client from './apollo/client';

const App = () => (
	<ApolloProvider client={client}>
		<Router>
			<Routes />
		</Router>
	</ApolloProvider>
);

const render = App =>
	ReactDOM.hydrate(
		<AppContainer>
			<App />
		</AppContainer>,
		document.getElementById('root'),
	);

if (process.env.NODE_ENV === 'development' && module.hot) {
	module.hot.accept('./routes/index.js', () => {
		const App = require('./routes/index').default; // eslint-ignore-line
		console.log('App', App);
		render(App);
	});
}

render(App);
