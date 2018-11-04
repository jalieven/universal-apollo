import React, { Fragment } from 'react';
import Helmet from 'react-helmet';
import { Route, Switch } from 'react-router';
import { ThemeProvider } from 'emotion-theming';
import styled from 'react-emotion';
import { IntlProvider, addLocaleData } from 'react-intl';
import { Transition, config as springConfig } from 'react-spring';
import localeEn from 'react-intl/locale-data/en';
import localeNl from 'react-intl/locale-data/nl';

import config from '../config';
import LoadComponent from '../utils/universal';
import messagesEn from '../translations/en.json';
import messagesNl from '../translations/nl.json';

import '../styles/general.styl'; // eslint-disable-line import/extensions
import styles from '../styles/general';

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
	<Route
		render={({ location }) => (
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
								<link rel="dns-prefetch" href={config.gqlUri} />
							</Helmet>
							<Transition
								config={springConfig.slow}
								keys={location.pathname}
								from={{ opacity: 0, transform: 'translateX(-110%)' }}
								enter={{ opacity: 1, transform: 'translateX(0%)' }}
								leave={{ opacity: 0, transform: 'translateX(110%)' }}
							>
								{item => style => (
									<Switch>
										<Route
											exact
											path="/"
											render={props => <Home style={style} {...props} />}
										/>
										<Route
											path="/episodes/:episode"
											render={props => (
												<HeroAndFriends style={style} {...props} />
											)}
										/>
									</Switch>
								)}
							</Transition>
						</Fragment>
					</ThemeProvider>
				</IntlProvider>
			</Fragment>
		)}
	/>
);

export default Routes;
