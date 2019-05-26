import React, { useState, useEffect } from 'react';
import useTitle from '../hooks/useTitle';
import Loading from '../components/Loading';
import Button from '../components/Button';
import {
  Table, Header, Body, Row, Column
} from '../components/Table';
import { BUTTON_SIZES, ALERT_VARIANTS, BUTTON_VARIANTS } from '../config/constants';
import AlertContext from '../contexts/Alert';
import useApi from '../hooks/useApi';

export default () => {
  useTitle('Aktywacja użytkowników');

  const api = useApi();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { createAlert } = AlertContext();

  const getDataFromService = async () => {
    let response;

    try {
      response = await api.get('/api/users/');
    } catch (error) {
      createAlert(
        `Błąd pobierania użytkowników z serwisu ${String.fromCodePoint(0x26a0)}`,
        ALERT_VARIANTS.danger
      );
      return;
    }

    if (response.status === 200) {
      setItems(response.data.users);
    }
    setIsLoading(false);
  };

  async function changeUserDetails(accountActive, userId) {
    let response;

    const apiRoute = accountActive ? '/api/deactivate_user/' : '/api/activate_user/';

    try {
      response = await api.post(apiRoute, { userId });
    } catch (error) {
      createAlert(
        `Błąd zmiany danych użytkownika ${String.fromCodePoint(0x26a0)}`,
        ALERT_VARIANTS.danger
      );
      return;
    }

    if (response.status === 200) {
      createAlert('Zmiana danych użytkownika zakończona pomyślnie!', ALERT_VARIANTS.success);
    }
    getDataFromService();
  }

  useEffect(() => {
    getDataFromService();
  }, []);

  return (
    <Loading isActive={isLoading}>
      <Table>
        <Header>
          <Row>
            <Column as="th">Użytkownik</Column>
            <Column as="th">Imię</Column>
            <Column as="th">Nazwisko</Column>
            <Column as="th">Status konta</Column>
            <Column as="th">Akcja</Column>
          </Row>
        </Header>

        <Body>
          {items.map(item => (
            <Row key={item.id}>
              <Column>{item.username}</Column>
              <Column>{item.first_name}</Column>
              <Column>{item.last_name}</Column>
              <Column>{item.is_active ? 'Aktywne' : 'Nieaktywne'}</Column>
              <Column>
                <Button
                  size={BUTTON_SIZES.small}
                  onClick={() => changeUserDetails(item.is_active, item.id)}
                  variant={item.is_active ? BUTTON_VARIANTS.warning : BUTTON_VARIANTS.success}
                >
                  {item.is_active ? 'Deaktywuj' : 'Aktywuj'}
                </Button>
              </Column>
            </Row>
          ))}
        </Body>
      </Table>
    </Loading>
  );
};
