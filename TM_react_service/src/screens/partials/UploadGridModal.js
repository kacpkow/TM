import React, { useState } from 'react';
import { ALERT_VARIANTS, API_URL } from '../../config/constants';
import { useAlert } from '../../contexts/Alert';
import useFetch from '../../hooks/useFetch';
import {
  Modal, Loading, Separator, Button
} from '../../components';
import UploadModal from './UploadModal';

const UploadGridModal = ({ isOpen, onClose, onSelect }) => {
  const { addAlert } = useAlert();
  const [isUploadModal, setIsUploadModal] = useState(false);

  const getData = useFetch({
    url: '/api/images/',
    onMount: true,
    onError: () => {
      addAlert('Błąd podczas ładowania plików', ALERT_VARIANTS.danger);
    }
  });

  const openModal = () => setIsUploadModal(true);
  const closeModal = () => setIsUploadModal(false);

  return (
    <Loading isActive={getData.isLoading}>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Button onClick={openModal}>Dodaj plik</Button>

        <Separator />

        {getData.response.images && (
          <div className="gallery">
            {getData.response.images.map(item => (
              <div
                key={item.id}
                className="gallery__item"
                onClick={() => onSelect(API_URL + item.pic)}
              >
                <img src={API_URL + item.pic} alt={item.id} />
              </div>
            ))}
          </div>
        )}
      </Modal>

      <UploadModal
        isOpen={isUploadModal}
        onClose={closeModal}
        onDone={() => {
          getData.fetch();
          closeModal();
        }}
      />
    </Loading>
  );
};

export default UploadGridModal;
