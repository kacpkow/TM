import React, { useState, useEffect } from 'react';
import useApi from '../../hooks/useApi';
import AlertContext from '../../contexts/Alert';
import Modal from '../../components/Modal';
import Loading from '../../components/Loading';
import Separator from '../../components/Separator';
import Button from '../../components/Button';
import UploadModal from './UploadModal';
import { ALERT_VARIANTS, API_URL } from '../../config/constants';

export default ({ isOpen, onClose, onSelect }) => {
  const { createAlert } = AlertContext();

  const api = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [isModal, setIsModal] = useState(false);
  const [items, setItems] = useState([]);

  const openModal = () => setIsModal(true);
  const closeModal = () => setIsModal(false);

  const fetchList = async () => {
    setIsLoading(true);

    try {
      const { data } = await api.get('/api/images/');

      setItems(
        data.images.map(item => ({
          id: item.id,
          url: API_URL + item.pic,
          name: item.pic_text
        }))
      );
    } catch (ex) {
      createAlert(
        `Błąd podczas ładowania plików ${String.fromCodePoint(0x26a0)}`,
        ALERT_VARIANTS.danger
      );
    }

    setIsLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <Loading isActive={isLoading}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Button onClick={openModal}>Dodaj plik</Button>

        <Separator />

        <div className="gallery">
          {items.map(item => (
            <div key={item.id} className="gallery__item" onClick={() => onSelect(item.url)}>
              <img src={item.url} alt={item.id} />
            </div>
          ))}
        </div>
      </Modal>

      <UploadModal
        isOpen={isModal}
        onClose={closeModal}
        onDone={() => {
          fetchList();
          closeModal();
        }}
      />
    </Loading>
  );
};
