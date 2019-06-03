import React from 'react';
import { Link, navigate } from '@reach/router';
import { ALERT_VARIANTS } from '../config/constants';
import { useAlert } from '../contexts/Alert';
import { useUser } from '../contexts/User';
import useTitle from '../hooks/useTitle';
import useForm from '../hooks/useForm';
import useFetch from '../hooks/useFetch';
import { Field, Button, Separator } from '../components';

const SignIn = () => {
  useTitle('Logowanie');

  const { addAlert } = useAlert();
  const { field, fields } = useForm();
  const { startSession } = useUser();

  const signIn = useFetch({
    url: '/api/login/',
    method: 'post',
    data: fields,
    onFetch: ({ user, token }) => {
      startSession({
        ...user,
        token
      });

      addAlert(`Cześć ${user.username}! Jak się masz?`, ALERT_VARIANTS.success);

      navigate('/');
    },
    onError: () => {
      addAlert('Błąd logowania, spróbuj ponownie!', ALERT_VARIANTS.danger);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    signIn.fetch();
  };

  return (
    <div className="sign-center">
      <form className="sign-form" onSubmit={handleSubmit}>
        <Field label="Nazwa użytkownika" {...field('username')} />
        <Field label="Hasło" type="password" {...field('password')} />

        <Button type="submit" isLoading={signIn.loading}>
          Zaloguj się
        </Button>

        <Separator />

        <div className="text-center">
          Nie masz konta? Przejdź do <Link to="/zarejestruj">rejestracji</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
