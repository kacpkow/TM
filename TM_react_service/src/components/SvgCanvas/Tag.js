import React from 'react';

const Tag = ({ as: Component, ...rest }) => <Component {...rest} />;

export default Tag;
