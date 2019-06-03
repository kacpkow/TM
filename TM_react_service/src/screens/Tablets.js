import React, { useState } from 'react';
import * as Icon from 'react-feather';
import { Link } from '@reach/router';
import {
  ALERT_VARIANTS, BUTTON_SIZES, ICON_SIZE, BUTTON_VARIANTS
} from '../config/constants';
import { useAlert } from '../contexts/Alert';
import useTitle from '../hooks/useTitle';
import useFetch from '../hooks/useFetch';
import {
  Table, Button, Separator, Loading
} from '../components';
import DeleteTabletModal from './partials/DeleteTabletModal';

const Tablets = () => {
  useTitle('Tablety');

  const { addAlert } = useAlert();
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const getData = useFetch({
    url: '/api/devices/',
    onMount: true,
    onError: () => {
      addAlert('Błąd pobierania danych z serwisu', ALERT_VARIANTS.danger);
    }
  });

  const openDeleteModal = id => setIsDeleteModal(id);
  const closeDeleteModal = () => setIsDeleteModal(false);

  return (
    <Loading isActive={getData.loading}>
      <Button as={Link} to="/tablety/dodaj">
        <Icon.PlusCircle size={15} /> Dodaj tablet
      </Button>

      <Separator />

      <DeleteTabletModal
        id={isDeleteModal}
        isOpen={isDeleteModal}
        onClose={closeDeleteModal}
        onDone={() => {
          getData.fetch();
          closeDeleteModal();
        }}
      />

      <Table
        columns={[
          {
            key: 'name',
            label: 'Nazwa tabletu'
          },
          {
            label: 'Akcje',
            format: item => (
              <>
                <Button
                  size={BUTTON_SIZES.small}
                  variant={BUTTON_VARIANTS.gray}
                  onClick={() => openDeleteModal(item.id)}
                >
                  <Icon.Trash2 size={ICON_SIZE.small} />
                </Button>

                {/* <Button
                  as={Link}
                  size={BUTTON_SIZES.small}
                  variant={BUTTON_VARIANTS.gray}
                  to={`/tablety/${item.id}`}
                >
                  <Icon.Edit size={ICON_SIZE.small} />
                </Button> */}
              </>
            )
          }
        ]}
        data={getData.response}
      />
    </Loading>
  );
};

export default Tablets;
