import React from 'react';
import useTitle from '../hooks/useTitle';

const NotFound = () => {
  useTitle('Strona nie znaleziona');

  return <div>Strona nie została znaleziona</div>;
};

export default NotFound;
