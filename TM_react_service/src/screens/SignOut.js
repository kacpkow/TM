import { useEffect } from 'react';
import { navigate } from '@reach/router';
import { useAlert } from '../contexts/Alert';
import { useUser } from '../contexts/User';
import { ALERT_VARIANTS } from '../config/constants';

const SignOut = () => {
  const { addAlert } = useAlert();
  const { user, clearSession } = useUser();

  useEffect(() => {
    addAlert(`Wylogowano pomyślnie, trzymaj się ${user.username}`, ALERT_VARIANTS.success);

    clearSession();

    navigate('/zaloguj');
  }, []);

  return null;
};

export default SignOut;
