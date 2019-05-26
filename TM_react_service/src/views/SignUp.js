import React from 'react';
import AlertContext from '../contexts/Alert';
import useTitle from '../hooks/useTitle';
import useForm from '../hooks/useForm';
import Field from '../components/Field';
import Button from '../components/Button';
import { ALERT_VARIANTS } from '../config/constants';
import useApi from '../hooks/useApi';

export default ({ history }) => {
  useTitle('Rejestracja');

  const { createAlert } = AlertContext();
  const { field, fields, setErrors } = useForm();
  const api = useApi();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    try {
      response = await api.post('/api/register/', fields);
    } catch (error) {
      createAlert(
        `Błąd rejestracji, spróbuj ponownie! ${String.fromCodePoint(0x26a0)}`,
        ALERT_VARIANTS.danger
      );
      setErrors(error.response.data);
      return;
    }

    if (response.status === 201) {
      createAlert(
        'Rejestracja zakończona pomyślnie! Twoje konto oczekuje na aktywację',
        ALERT_VARIANTS.success
      );
      history.push({
        pathname: '/zaloguj',
        state: {
          auth: true
        }
      });
    } else {
      createAlert(`Błąd rejestracji! ${String.fromCodePoint(0x1f44b)}`, ALERT_VARIANTS.danger);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field label="Nazwa użytkownika" {...field('username')} />
      <Field label="Imię" {...field('first_name')} />
      <Field label="Nazwisko" {...field('last_name')} />
      <Field label="Adres email" {...field('email')} />
      <Field label="Hasło" type="password" {...field('password')} />
      <Field label="Powtórz hasło" type="password" {...field('repassword')} />

      <Button type="submit">Zarejestruj się</Button>
    </form>
  );
};
