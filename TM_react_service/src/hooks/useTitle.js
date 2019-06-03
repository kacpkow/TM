import { useEffect } from 'react';
import { useSetting } from '../contexts/Setting';

const useTitle = (title) => {
  const { addSetting } = useSetting();

  useEffect(() => {
    document.title = title || document.title;

    addSetting('title', title);
  }, [title]);
};

export default useTitle;
