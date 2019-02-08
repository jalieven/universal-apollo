import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router';
import { ThemeProvider } from 'emotion-theming';
import styled from 'react-emotion';
import { IntlProvider, addLocaleData } from 'react-intl';
import localeEn from 'react-intl/locale-data/en';
import localeNl from 'react-intl/locale-data/nl';

import config from '../config';
import LoadComponent from '../utils/universal';
import messagesEn from '../translations/en.json';
import messagesNl from '../translations/nl.json';

import '../styles/general.styl'; // eslint-disable-line import/extensions
import styles from '../styles/general';

const Home = LoadComponent('routes/home');
const FilmAndCharacters = LoadComponent('routes/film');

const theme = {
	primaryColor: 'hotpink',
	background: 'grey',
};

addLocaleData([...localeEn, ...localeNl]);
const messages = {
	en: messagesEn,
	nl: messagesNl,
};

const Routes = ({ language }) => (
	<Fragment>
		<IntlProvider
			key={`intl-provider-${language}`}
			locale={language}
			messages={messages[language]}
			defaultLocale={config.defaultLanguage}
		>
			<ThemeProvider theme={theme}>
				<Fragment>
					<Helmet>
						<html lang="en" amp />
						<link rel="dns-prefetch" href={config.gqlUri} />
						<meta name="viewport" content="width=device-width, initial-scale=1" />
					</Helmet>
					<Switch>
						<Route exact path="/" render={props => <Home {...props} />} />
						<Route
							path="/films/:film"
							render={props => <FilmAndCharacters {...props} />}
						/>
					</Switch>
				</Fragment>
			</ThemeProvider>
		</IntlProvider>
	</Fragment>
);

export default Routes;
