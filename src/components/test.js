import React from 'react';
import get from 'lodash/get';

const text = get({ text: 'Second' }, 'text');

const Test = () => <div>{text}</div>;

export default Test;
