import React, { useState, useEffect } from 'react';
import copy from 'copy-to-clipboard';
import * as Icon from 'react-feather';
import { format } from 'date-fns';
import AlertContext from '../contexts/Alert';
import useTitle from '../hooks/useTitle';
import Loading from '../components/Loading';
import Button from '../components/Button';
import Separator from '../components/Separator';
import UploadModal from './partials/UploadModal';
import DeleteUploadModal from './partials/DeleteUploadModal';
import {
  Table, Header, Body, Row, Column
} from '../components/Table';
import useApi from '../hooks/useApi';
import { ALERT_VARIANTS, API_URL, BUTTON_SIZES } from '../config/constants';
import ImagePreview from './partials/ImagePreview';

export default () => {
  useTitle('Manager plików');

  const api = useApi();
  const { createAlert } = AlertContext();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadModal, setIsUploadModal] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [preview, setPreview] = useState(null);

  const fetchList = async () => {
    setIsLoading(true);

    let response;

    try {
      response = await api.get('/api/images/');
    } catch (ex) {
      createAlert(
        `Błąd podczas ładowania plików ${String.fromCodePoint(0x26a0)}`,
        ALERT_VARIANTS.danger
      );

      setIsLoading(false);
      return;
    }

    setItems(
      response.data.images.map(item => ({
        id: item.id,
        name: item.pic_text,
        url: API_URL + item.pic,
        createdAt: item.timestamp
      }))
    );
    setIsLoading(false);
  };

  const openUploadModal = () => setIsUploadModal(true);
  const closeUploadModal = () => setIsUploadModal(false);

  const openDeleteModal = id => setIsDeleteModal(id);
  const closeDeleteModal = () => setIsDeleteModal(false);

  const copyUrl = (url) => {
    copy(url);
    createAlert(
      `Link do grafiki został skopiowany do schowka ${String.fromCodePoint(0x1f64c)}`,
      ALERT_VARIANTS.success
    );
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Loading isActive={isLoading}>
      <Button onClick={openUploadModal}><Icon.PlusCircle size={15} /> Dodaj plik</Button>

      <Separator />

      <UploadModal
        isOpen={isUploadModal}
        onClose={closeUploadModal}
        onDone={() => {
          fetchList();
          closeUploadModal();
        }}
      />

      <ImagePreview image={preview} isOpen={preview} onClose={() => setPreview(null)} />

      <DeleteUploadModal
        id={isDeleteModal}
        isOpen={isDeleteModal}
        onClose={closeDeleteModal}
        onDone={() => {
          fetchList();
          closeDeleteModal();
        }}
      />

      <Table>
        <Header>
          <Row>
            <Column as="th">Nazwa</Column>
            <Column as="th">Data utworzenia</Column>
            <Column as="th">Akcje</Column>
          </Row>
        </Header>

        <Body>
          {items.map(item => (
            <Row key={item.id}>
              <Column>
                <a target="_blank" rel="noopener noreferrer" href={item.url}>
                  {item.name}
                </a>
              </Column>

              <Column>{format(new Date(item.createdAt), 'MM/DD/YYYY, HH:mm')}</Column>

              <Column style={{ minWidth: 150 }}>
                <Button size={BUTTON_SIZES.small} onClick={() => openDeleteModal(item.id)}>
                  <Icon.Trash2 size={15} />
                </Button>

                <Button size={BUTTON_SIZES.small} onClick={() => setPreview(item.url)}>
                  <Icon.Eye size={15} />
                </Button>

                <Button size={BUTTON_SIZES.small} onClick={() => copyUrl(item.url)}>
                  <Icon.Clipboard size={15} />
                </Button>
              </Column>
            </Row>
          ))}
        </Body>
      </Table>
    </Loading>
  );
};
