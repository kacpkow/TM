import React from 'react';
import { Link } from '@reach/router';
import * as Icon from 'react-feather';
import {
  BUTTON_SIZES, ALERT_VARIANTS, BUTTON_VARIANTS, ICON_SIZE
} from '../config/constants';
import useTitle from '../hooks/useTitle';
import useFetch from '../hooks/useFetch';
import { useAlert } from '../contexts/Alert';
import { useUser } from '../contexts/User';
import { Loading, Button, Table } from '../components';

const Activation = () => {
  useTitle('Aktywacja użytkowników');

  const { user } = useUser();
  const { addAlert } = useAlert();

  const getUsers = useFetch({
    url: '/api/users/',
    onMount: true,
    onError: () => {
      addAlert('Błąd pobierania użytkowników do aktywacji z API', ALERT_VARIANTS.danger);
    }
  });

  const updateUser = useFetch({
    method: 'post',
    onFetch: () => {
      getUsers.fetch();
    },
    onError: () => {
      addAlert('Błąd zmiany statusu użytkownika z API', ALERT_VARIANTS.danger);
    }
  });

  const toggleStatus = async (isActive, userId) => {
    updateUser.fetch({
      url: isActive ? '/api/deactivate_user/' : '/api/activate_user/',
      data: { userId }
    });
  };

  return (
    <Loading isActive={getUsers.loading}>
      <Table
        columns={[
          {
            key: 'username',
            label: 'Użytkownik'
          },
          {
            key: 'first_name',
            label: 'Imię'
          },
          {
            key: 'last_name',
            label: 'Nazwisko'
          },
          {
            label: 'Status konta',
            format: item => (item.is_active ? 'Aktywne' : 'Nieaktywne')
          },
          {
            label: 'Akcja',
            format: item => (
              <>
                <Button
                  as={Link}
                  size={BUTTON_SIZES.small}
                  variant={BUTTON_VARIANTS.gray}
                  to={`/konto/${item.id}`}
                >
                  <Icon.Edit size={ICON_SIZE.small} />
                </Button>

                <Button
                  disabled={item.id === user.id}
                  size={BUTTON_SIZES.small}
                  onClick={() => toggleStatus(item.is_active, item.id)}
                  variant={item.is_active ? BUTTON_VARIANTS.warning : BUTTON_VARIANTS.success}
                >
                  {item.is_active ? 'Deaktywuj' : 'Aktywuj'}
                </Button>
              </>
            )
          }
        ]}
        data={getUsers.response.users}
      />
    </Loading>
  );
};

export default Activation;
