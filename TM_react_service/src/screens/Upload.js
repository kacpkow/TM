import React, { useState } from 'react';
import copy from 'copy-to-clipboard';
import * as Icon from 'react-feather';
import { format } from 'date-fns';
import {
  ALERT_VARIANTS,
  API_URL,
  ICON_SIZE,
  DATE_FORMAT,
  BUTTON_VARIANTS,
  BUTTON_SIZES
} from '../config/constants';
import { useAlert } from '../contexts/Alert';
import useTitle from '../hooks/useTitle';
import useFetch from '../hooks/useFetch';
import {
  Loading, Button, Separator, Table
} from '../components';
import UploadModal from './partials/UploadModal';
import DeleteUploadModal from './partials/DeleteUploadModal';
import ImageModal from './partials/ImageModal';

const Upload = () => {
  useTitle('Manager plików');

  const { addAlert } = useAlert();
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [preview, setPreview] = useState(null);

  const getData = useFetch({
    url: '/api/images/',
    onMount: true,
    onError: () => {
      addAlert('Błąd podczas ładowania plików', ALERT_VARIANTS.danger);
    }
  });

  const openUploadModal = () => setIsUploadModal(true);
  const closeUploadModal = () => setIsUploadModal(false);

  const openDeleteModal = id => setIsDeleteModal(id);
  const closeDeleteModal = () => setIsDeleteModal(false);

  const copyUrl = (url) => {
    copy(url);
    addAlert('Link do grafiki został skopiowany do schowka', ALERT_VARIANTS.success);
  };

  return (
    <Loading isActive={getData.loading}>
      <Button onClick={openUploadModal}>
        <Icon.PlusCircle size={ICON_SIZE.small} /> Dodaj plik
      </Button>

      <Separator />

      <UploadModal
        isOpen={isUploadModal}
        onClose={closeUploadModal}
        onDone={() => {
          getData.fetch();
          closeUploadModal();
        }}
      />

      <ImageModal image={preview} isOpen={preview} onClose={() => setPreview(null)} />

      <DeleteUploadModal
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
            key: 'pic_text',
            label: 'Nazwa'
          },
          {
            label: 'Data utworzenia',
            format: item => format(item.timestamp, DATE_FORMAT)
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
                  onClick={() => setPreview(API_URL + item.pic)}
                >
                  <Icon.Eye size={ICON_SIZE.small} />
                </Button>

                <Button
                  size={BUTTON_SIZES.small}
                  variant={BUTTON_VARIANTS.gray}
                  onClick={() => copyUrl(API_URL + item.pic)}
                >
                  <Icon.Clipboard size={ICON_SIZE.small} />
                </Button>
              </>
            )
          }
        ]}
        data={getData.response.images}
      />
    </Loading>
  );
};

export default Upload;
