import React from 'react';
import { navigate } from '@reach/router';
import useTitle from '../hooks/useTitle';
import useForm from '../hooks/useForm';
import useFetch from '../hooks/useFetch';
import { useAlert } from '../contexts/Alert';
import { Field, Button, Loading } from '../components';
import { ALERT_VARIANTS } from '../config/constants';

const UpsertTablet = () => {
  useTitle('Dodaj tablet');

  const { addAlert } = useAlert();
  const {
    field, fields, setFields, setErrors
  } = useForm();

  const url = '/api/grant_device/';

  const getData = useFetch({
    url,
    onFetch: (response) => {
      setFields(response.data);
    },
    onError: () => {
      addAlert('Błąd pobierania danych tabletu z API', ALERT_VARIANTS.danger);
    }
  });

  const updateData = useFetch({
    url,
    method: 'post',
    data: fields,
    onFetch: () => {
      addAlert('Sukces, dane tabletu zostały poprawnie zapisane', ALERT_VARIANTS.success);
      navigate('/tablety');
    },
    onError: (errors) => {
      addAlert('Błąd zapisu danych tabletu', ALERT_VARIANTS.danger);
      setErrors(errors.response.data);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateData.fetch();
  };

  return (
    <Loading isActive={getData.loading}>
      <form onSubmit={handleSubmit}>
        <Field label="Nazwa tabletu" {...field('name')} />
        <Field label="Hasło" type="password" {...field('password')} />
        <Field label="Powtórz hasło" type="password" {...field('repassword')} />

        <Button type="submit" isLoading={updateData.loading}>
          Zapisz zmiany
        </Button>
      </form>
    </Loading>
  );
};

export default UpsertTablet;
