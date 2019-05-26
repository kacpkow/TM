import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

export default () => {
  const [mode, setMode] = useLocalStorage('dark', false);

  const toggle = () => setMode(prev => !prev);

  useEffect(() => {
    const className = 'dark';
    const element = window.document.body;

    if (mode) {
      element.classList.add(className);
    } else {
      element.classList.remove(className);
    }
  }, [mode]);

  return { toggle };
};
