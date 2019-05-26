import React, { useState, useEffect } from 'react';
import useTitle from '../hooks/useTitle';
import useApi from '../hooks/useApi';
import SvgCanvas from '../components/SvgCanvas';
import Loading from '../components/Loading';
import AlertContext from '../contexts/Alert';
import { ALERT_VARIANTS } from '../config/constants';

export default ({ history, match: { params } }) => {
  useTitle('Dodaj grafikę');

  const api = useApi();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { createAlert } = AlertContext();

  const fetchItem = async () => {
    setIsLoading(true);

    let response;

    try {
      response = await api.get(`/api/editor/${params.id}/`);
    } catch (error) {
      createAlert(
        `Błąd pobierania danych z serwisu ${String.fromCodePoint(0x26a0)}`,
        ALERT_VARIANTS.danger
      );
      return;
    }

    setData(JSON.parse(response.data.config));
    setIsLoading(false);
  };

  useEffect(() => {
    if (params.id) {
      fetchItem();
    }
    setIsLoading(false);
  }, []);

  const save = async ({ config, source }) => {
    setIsLoading(true);
    setData(config);

    let response;

    try {
      response = await api({
        url: `api/editor/${params.id ? `${params.id}/` : ''}`,
        method: params.id ? 'put' : 'post',
        data: {
          config: JSON.stringify(config),
          source
        }
      });
    } catch (error) {
      createAlert(
        `Błąd pobierania danych z serwisu ${String.fromCodePoint(0x26a0)}`,
        ALERT_VARIANTS.danger
      );
      return;
    }

    if (!params.id) {
      history.push(`/edytor/${response.data.id}`);
    }

    setIsLoading(false);
    createAlert(
      `Sukces, obraz został pomyślnie zapisany ${String.fromCodePoint(0x26a0)}`,
      ALERT_VARIANTS.success
    );
  };

  return (
    <Loading isActive={isLoading}>
      <SvgCanvas initialValue={data} save={save} />
    </Loading>
  );
};
