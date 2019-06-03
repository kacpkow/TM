import React, { useState } from 'react';
import { format } from 'date-fns';
import * as Icon from 'react-feather';
import { Link } from '@reach/router';
import copy from 'copy-to-clipboard';
import {
  API_URL,
  BUTTON_SIZES,
  DATE_FORMAT,
  ICON_SIZE,
  BUTTON_VARIANTS,
  ALERT_VARIANTS
} from '../config/constants';
import useTitle from '../hooks/useTitle';
import useFetch from '../hooks/useFetch';
import {
  Table, Button, Separator, Loading
} from '../components';
import ImageModal from './partials/ImageModal';
import DeleteEditorItemModal from './partials/DeleteEditorItemModal';
import { useAlert } from '../contexts/Alert';

const Main = () => {
  useTitle('Strona główna');

  const { addAlert } = useAlert();

  const getData = useFetch({
    url: '/api/editor/',
    onMount: true
  });

  const [preview, setPreview] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);

  const openDeleteModal = id => setIsDeleteModal(id);
  const closeDeleteModal = () => setIsDeleteModal(false);

  const copyUrl = (url) => {
    copy(url);
    addAlert('Link do grafiki został skopiowany do schowka', ALERT_VARIANTS.success);
  };

  return (
    <Loading isActive={getData.loading}>
      <Button as={Link} to="/edytor">
        <Icon.PlusCircle size={15} /> Dodaj grafikę
      </Button>

      <Separator />

      <ImageModal image={preview} isOpen={preview} onClose={() => setPreview(null)} />

      <DeleteEditorItemModal
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
            label: 'Link',
            format: (item) => {
              const url = `${API_URL}/image/${item.id}/`;

              return (
                <a href={url} target="_blank" rel="noopener noreferrer">
                  {url}
                </a>
              );
            }
          },
          {
            key: 'author',
            label: 'Autor'
          },
          {
            label: 'Data utworzenia',
            format: item => format(item.created_at, DATE_FORMAT)
          },
          {
            label: 'Data edycji',
            format: item => format(item.updated_at, DATE_FORMAT)
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

                <Button
                  size={BUTTON_SIZES.small}
                  variant={BUTTON_VARIANTS.gray}
                  onClick={() => setPreview(`${API_URL}/image/${item.id}/`)}
                >
                  <Icon.Eye size={ICON_SIZE.small} />
                </Button>

                <Button
                  as={Link}
                  size={BUTTON_SIZES.small}
                  variant={BUTTON_VARIANTS.gray}
                  to={`/edytor/${item.id}`}
                >
                  <Icon.Edit size={ICON_SIZE.small} />
                </Button>

                <Button
                  size={BUTTON_SIZES.small}
                  variant={BUTTON_VARIANTS.gray}
                  onClick={() => copyUrl(`${API_URL}/image/${item.id}/`)}
                >
                  <Icon.Clipboard size={ICON_SIZE.small} />
                </Button>
              </>
            )
          }
        ]}
        data={getData.response}
      />
    </Loading>
  );
};

export default Main;
