import { useEffect } from 'react';
import AlertContext from '../contexts/Alert';
import UserContext from '../contexts/User';
import { ALERT_VARIANTS } from '../config/constants';

export default ({ history }) => {
  const { createAlert } = AlertContext();
  const { clearSession } = UserContext();

  useEffect(() => {
    createAlert(
      `Wylogowano pomyślnie, trzymaj się Andrzej ${String.fromCodePoint(0x1f64c)}`,
      ALERT_VARIANTS.success
    );

    clearSession();

    history.push('/zaloguj');
  }, []);

  return null;
};
