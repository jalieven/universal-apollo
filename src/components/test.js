import React from 'react';
import styled from 'react-emotion';
import { useTransition, useSpring, animated } from 'react-spring';
import { useGesture } from 'react-with-gesture';
import get from 'lodash/get';
import map from 'lodash/map';

const Title = styled('h2')(props => ({
	color: props.theme.primaryColor,
	backgroundColor: props.theme.background,
}));

const text = get({ text: 'Second' }, 'text');

const Test = () => {
	const [{ xy }, set] = useSpring(() => ({ xy: [0, 0] }));
	const bind = useGesture(({ down, delta }) => set({ xy: down ? delta : [0, 0] }));
	const transitions = useTransition({ text }, item => item.id, {
		from: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
		enter: { opacity: 1, transform: 'translate3d(0,0px,0)' },
		leave: { opacity: 0, transform: 'translate3d(0,-40px,0)' },
	});
	return map(transitions, ({ item, key, props }) => (
		<animated.div
			key={key}
			{...bind()}
			style={{ transform: xy.interpolate((x, y) => `translate3d(${x}px,${y}px,0)`) }}
		>
			<Title>{item.text}</Title>
		</animated.div>
	));
};

export default Test;
