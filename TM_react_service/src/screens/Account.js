import React from 'react';
import useTitle from '../hooks/useTitle';
import useForm from '../hooks/useForm';
import useFetch from '../hooks/useFetch';
import { useAlert } from '../contexts/Alert';
import { Field, Button, Loading } from '../components';
import { ALERT_VARIANTS } from '../config/constants';

const Account = ({ id }) => {
  useTitle(id ? 'Edycja konta' : 'Moje konto');

  const { addAlert } = useAlert();
  const {
    field, fields, setFields, setErrors
  } = useForm();

  const getUser = useFetch({
    url: id ? `/api/user/${id}/` : '/api/user/',
    onMount: true,
    onFetch: (response) => {
      setFields(response.user[0]);
    },
    onError: () => {
      addAlert('Błąd pobierania danych użytkownika z API', ALERT_VARIANTS.danger);
    }
  });

  const updateUser = useFetch({
    url: id ? `/api/update_user/${id}/` : '/api/update_user/',
    method: 'patch',
    data: fields,
    onFetch: () => {
      addAlert('Sukces, dane użytkownika zostały poprawnie zapisane', ALERT_VARIANTS.success);
    },
    onError: (errors) => {
      addAlert('Błąd zapisu danych użytkownika', ALERT_VARIANTS.danger);
      setErrors(errors.response.data);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateUser.fetch();
  };

  return (
    <Loading isActive={getUser.loading}>
      <form onSubmit={handleSubmit}>
        <Field label="Nazwa użytkownika" {...field('username')} />
        <Field label="Imię" {...field('first_name')} />
        <Field label="Nazwisko" {...field('last_name')} />
        <Field label="Adres email" {...field('email')} />
        <Field label="Hasło" type="password" {...field('password')} />
        <Field label="Powtórz hasło" type="password" {...field('repassword')} />

        <Button type="submit" isLoading={updateUser.loading}>
          Zapisz zmiany
        </Button>
      </form>
    </Loading>
  );
};

export default Account;
