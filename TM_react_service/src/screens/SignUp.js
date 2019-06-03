import React from 'react';
import { Link, navigate } from '@reach/router';
import { ALERT_VARIANTS } from '../config/constants';
import { useAlert } from '../contexts/Alert';
import useTitle from '../hooks/useTitle';
import useForm from '../hooks/useForm';
import useFetch from '../hooks/useFetch';
import { Field, Button, Separator } from '../components';

const SignUp = () => {
  useTitle('Rejestracja');

  const { addAlert } = useAlert();
  const { field, fields, setErrors } = useForm();

  const signUp = useFetch({
    url: '/api/register/',
    method: 'post',
    data: fields,
    onFetch: () => {
      addAlert(
        'Rejestracja zakończona pomyślnie! Twoje konto oczekuje na aktywację',
        ALERT_VARIANTS.success
      );

      navigate('/zaloguj');
    },
    onError: (errors) => {
      addAlert('Błąd rejestracji, spróbuj ponownie!', ALERT_VARIANTS.danger);
      setErrors(errors.response.data);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signUp.fetch();
  };

  return (
    <div className="sign-center">
      <form className="sign-form" onSubmit={handleSubmit}>
        <Field label="Nazwa użytkownika" {...field('username')} />
        <Field label="Imię" {...field('first_name')} />
        <Field label="Nazwisko" {...field('last_name')} />
        <Field label="Adres email" {...field('email')} />
        <Field label="Hasło" type="password" {...field('password')} />
        <Field label="Powtórz hasło" type="password" {...field('repassword')} />

        <Button type="submit" isLoading={signUp.loading}>
          Zarejestruj się
        </Button>

        <Separator />

        <div className="text-center">
          Masz już konto? Przejdź do <Link to="/zaloguj">logowania</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
