import React, { useState, useEffect } from 'react';
import AlertContext from '../contexts/Alert';
import useTitle from '../hooks/useTitle';
import useForm from '../hooks/useForm';
import Field from '../components/Field';
import Loading from '../components/Loading';
import Button from '../components/Button';
import { ALERT_VARIANTS } from '../config/constants';
import useApi from '../hooks/useApi';

export default () => {
  useTitle('Moje konto');

  const api = useApi();

  const { createAlert } = AlertContext();
  const {
    field, fields, setFields, setErrors
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);

  const getUserFromApi = async () => {
    let response;

    try {
      response = await api.get('/api/user/');
    } catch (error) {
      createAlert('Błąd pobierania danych użytkownika z serwisu', ALERT_VARIANTS.danger);
      return;
    }

    if (response.status === 200) {
      const res = response.data;

      setIsLoading(false);

      const {
        username, first_name, last_name, email
      } = res.user[0];

      setFields({
        username,
        first_name,
        last_name,
        email
      });
      setErrors({});
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    let response;

    try {
      response = await api.patch('/api/change_user_values/', fields);
    } catch (error) {
      createAlert('Ups, coś poszło nie tak...', ALERT_VARIANTS.danger);
      setErrors(error.response.data);
      setIsLoading(false);
      return;
    }

    if (response.status === 202) {
      createAlert('Zmiana danych zakończona pomyślnie', ALERT_VARIANTS.success);
      getUserFromApi();
    } else {
      createAlert('Ups, coś poszło nie tak...', ALERT_VARIANTS.danger);

      setIsLoading(false);
      return;
    }

    setIsLoading(false);
  };

  useEffect(() => {
    getUserFromApi();
  }, []);

  return (
    <Loading isActive={isLoading}>
      <form onSubmit={handleSubmit}>
        <Field label="Nazwa użytkownika" {...field('username')} />
        <Field label="Imię" {...field('first_name')} />
        <Field label="Nazwisko" {...field('last_name')} />
        <Field label="Adres email" {...field('email')} />
        <Field label="Hasło" type="password" {...field('password')} />
        <Field label="Powtórz hasło" type="password" {...field('repassword')} />

        <Button type="submit">Zapisz zmiany</Button>
      </form>
    </Loading>
  );
};
