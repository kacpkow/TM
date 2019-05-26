import { useEffect } from 'react';
import SettingsContext from '../contexts/Settings';

export default (title) => {
  const { createSetting } = SettingsContext();

  useEffect(() => {
    document.title = title || document.title;

    createSetting('title', title);
  }, [title]);
};
