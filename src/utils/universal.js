import React from 'react';
import universal from 'react-universal-component';

import config from '../config';

const Loading = () => <div>Loading javascript...</div>;
const LoadError = () => <div>Error encountered...</div>;

const determineHowToLoad = ({ page }) =>
	typeof page !== 'string' ? () => page() : import(`./../${page}`);

const LoadComponent = file =>
	universal(determineHowToLoad({ page: file }), {
		onError: error => {
			throw error;
		},
		minDelay: config.loadMinDelay,
		loading: Loading,
		error: LoadError,
	});

export default LoadComponent;
