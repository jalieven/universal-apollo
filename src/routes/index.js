import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router';
import { ThemeProvider } from 'emotion-theming';
import { IntlProvider, addLocaleData } from 'react-intl';
import localeEn from 'react-intl/locale-data/en';
import localeNl from 'react-intl/locale-data/nl';

import config from '../config';
import LoadComponent from '../utils/universal';
import messagesEn from '../translations/en.json';
import messagesNl from '../translations/nl.json';

const Home = LoadComponent('routes/home');
const HeroAndFriends = LoadComponent('routes/hero');

const theme = {
	primaryColor: 'green',
};

addLocaleData([...localeEn, ...localeNl]);
const messages = {
	en: messagesEn,
	nl: messagesNl,
};

const Routes = ({ language }) => (
	<IntlProvider
		key={`intl-provider-${language}`}
		locale={language}
		messages={messages[language]}
		defaultLocale={config.defaultLanguage}
	>
		<ThemeProvider theme={theme}>
			<Fragment>
				<Helmet>
					<link rel="dns-prefetch" href={config.gqlUri} />
				</Helmet>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/episodes/:episode" component={HeroAndFriends} />
				</Switch>
			</Fragment>
		</ThemeProvider>
	</IntlProvider>
);

export default Routes;
