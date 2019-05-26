import React from 'react';
import AlertContext from '../contexts/Alert';
import UserContext from '../contexts/User';
import useTitle from '../hooks/useTitle';
import useForm from '../hooks/useForm';
import Field from '../components/Field';
import Button from '../components/Button';
import { ALERT_VARIANTS } from '../config/constants';
import useApi from '../hooks/useApi';

export default ({ history }) => {
  useTitle('Logowanie');

  const { createAlert } = AlertContext();
  const { startSession } = UserContext();

  const api = useApi();
  const { field, fields } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    let response;

    try {
      response = await api.post('/api/login/', fields);
    } catch (error) {
      createAlert(
        `${error.response.data.message} ${String.fromCodePoint(0x26a0)}`,
        ALERT_VARIANTS.danger
      );
      return;
    }

    if (response.status === 200) {
      const { data } = response;

      startSession({
        username: fields.username,
        email: fields.email,
        ...data
      });

      createAlert(
        `Cześć ${fields.username}! Jak się masz? ${String.fromCodePoint(0x1f44b)}`,
        ALERT_VARIANTS.success
      );

      history.push('/');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field label="Nazwa użytkownika" {...field('username')} />
      <Field label="Hasło" type="password" {...field('password')} />

      <Button type="submit">Zaloguj się</Button>
    </form>
  );
};
