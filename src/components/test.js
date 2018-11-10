import React from 'react';
import styled from 'react-emotion';
import { Transition } from 'react-spring';
import get from 'lodash/get';

const Title = styled('h2')(props => ({
	color: props.theme.primaryColor,
}));

const text = get({ text: 'Second' }, 'text');

const Test = () => (
	<Transition
		items={{ text }}
		from={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
		enter={{ opacity: 1, transform: 'translate3d(0,0px,0)' }}
		leave={{ opacity: 0, transform: 'translate3d(0,-40px,0)' }}
	>
		{item => style => <Title style={style}>{item.text}</Title>}
	</Transition>
);

export default Test;
