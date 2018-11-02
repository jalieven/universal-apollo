import React from 'react';
import styled from 'react-emotion';
import get from 'lodash/get';

const Title = styled('h2')(props => ({
	color: props.theme.primaryColor,
}));

const text = get({ text: 'Second' }, 'text');

const Test = () => <Title>{text}</Title>;

export default Test;
