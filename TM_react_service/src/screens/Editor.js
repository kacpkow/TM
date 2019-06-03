import React, { useEffect, useState } from 'react';
import { navigate } from '@reach/router';
import useTitle from '../hooks/useTitle';
import useFetch from '../hooks/useFetch';
import { useAlert } from '../contexts/Alert';
import { SvgCanvas, Loading } from '../components';
import { ALERT_VARIANTS } from '../config/constants';

const Editor = ({ id }) => {
  useTitle(id ? 'Edycja grafiki' : 'Dodaj grafikę');

  const { addAlert } = useAlert();
  const [data, setData] = useState([]);
  const [device, setDevice] = useState(null);

  const url = id ? `api/editor/${id}/` : 'api/editor/';

  const getData = useFetch({
    url,
    onFetch: (response) => {
      setData(JSON.parse(response.config));
    },
    onError: () => {
      addAlert('Błąd pobierania danych edytora z API', ALERT_VARIANTS.danger);
    }
  });

  const getDevices = useFetch({
    url: '/api/devices/',
    onMount: true,
    onError: () => {
      addAlert('Błąd pobierania tabletów z API', ALERT_VARIANTS.danger);
    }
  });

  const saveData = useFetch({
    url,
    method: id ? 'put' : 'post',
    onFetch: (response) => {
      addAlert('Sukces, obraz został pomyślnie zapisany', ALERT_VARIANTS.success);
      navigate(`/edytor/${response.id}`);
    },
    onError: () => {
      addAlert('Błąd zapisu edytora do API', ALERT_VARIANTS.danger);
    }
  });

  const handleSave = async ({ config, source }) => {
    saveData.fetch({
      data: {
        device,
        config: JSON.stringify(config),
        source
      }
    });
  };

  const handleDevice = (e) => {
    setDevice(e.target.value);
  };

  useEffect(() => {
    if (id) {
      getData.fetch();
    }
  }, []);

  return (
    <Loading isActive={getData.loading}>
      <SvgCanvas
        initialValue={data}
        save={handleSave}
        saving={saveData.loading}
        afterTools={() => (
          <label className="devices-selector" htmlFor="devicesSelect">
            <div>Wybierz urządzenie na którym będzie wyświetlany obraz:</div>

            <select id="devicesSelect" onChange={handleDevice} value={device}>
              {getDevices.response.length > 0 ? (
                <>
                  <option selected={!getData.response.device}> Wybierz </option>

                  {getDevices.response.map(item => (
                    <option value={item.id} selected={getData.response.device === item.id}>
                      {item.name}
                    </option>
                  ))}
                </>
              ) : (
                <option>Brak urządzeń</option>
              )}
            </select>
          </label>
        )}
      />
    </Loading>
  );
};

export default Editor;
