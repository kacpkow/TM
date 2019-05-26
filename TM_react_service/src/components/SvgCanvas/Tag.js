import { createElement } from 'react';

export default ({ as, children, ...rest }) => createElement(as, rest, children);
