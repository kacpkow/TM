import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import * as Icon from 'react-feather';
import { Link } from 'react-router-dom';
import useTitle from '../hooks/useTitle';
import Loading from '../components/Loading';
import ImagePreview from './partials/ImagePreview';
import { ALERT_VARIANTS, BUTTON_SIZES, API_URL } from '../config/constants';
import AlertContext from '../contexts/Alert';
import Button from '../components/Button';
import Separator from '../components/Separator';
import useApi from '../hooks/useApi';
import {
  Table, Header, Body, Row, Column
} from '../components/Table';
import DeleteEditorItemModal from './partials/DeleteEditorItemModal';

export default () => {
  useTitle('Strona główna');

  const api = useApi();

  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const { createAlert } = AlertContext();

  const fetchList = async () => {
    let response;

    try {
      response = await api.get('/api/editor/');
    } catch (error) {
      createAlert(
        `Błąd pobierania danych z serwisu ${String.fromCodePoint(0x26a0)}`,
        ALERT_VARIANTS.danger
      );
      return;
    }

    setItems(
      response.data.map(item => ({
        id: item.id,
        url: `${API_URL}/image/${item.id}/`,
        createdAt: item.created_at,
        updatedAt: item.updated_at,
        source: item.source,
        author: item.author
      }))
    );
    setIsLoading(false);
  };

  const openDeleteModal = id => setIsDeleteModal(id);
  const closeDeleteModal = () => setIsDeleteModal(false);

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Loading isActive={isLoading}>
      <Button as={Link} to="edytor">
        Dodaj grafikę
      </Button>

      <Separator />

      <ImagePreview isOpen={preview} onClose={() => setPreview(false)}>
        {preview}
      </ImagePreview>

      <DeleteEditorItemModal
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
            <Column as="th">Link</Column>
            <Column as="th">Autor</Column>
            <Column as="th">Data utworzenia</Column>
            <Column as="th">Data edycji</Column>
            <Column as="th">Akcje</Column>
          </Row>
        </Header>

        <Body>
          {items.map(item => (
            <Row key={item.id}>
              <Column>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  {item.url}
                </a>
              </Column>

              <Column>{item.author || '-'}</Column>
              <Column>{format(new Date(item.createdAt), 'MM/DD/YYYY, HH:mm')}</Column>
              <Column>{format(new Date(item.updatedAt), 'MM/DD/YYYY, HH:mm')}</Column>

              <Column>
                <Button size={BUTTON_SIZES.small} onClick={() => openDeleteModal(item.id)}>
                  <Icon.Trash2 size={15} />
                </Button>

                <Button size={BUTTON_SIZES.small} onClick={() => setPreview(item.source)}>
                  <Icon.Eye size={15} />
                </Button>

                <Button as={Link} size={BUTTON_SIZES.small} to={`edytor/${item.id}`}>
                  <Icon.Edit size={15} />
                </Button>
              </Column>
            </Row>
          ))}
        </Body>
      </Table>
    </Loading>
  );
};
