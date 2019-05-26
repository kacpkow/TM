import React, { useState } from 'react';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { MODAL_SIZES, ALERT_VARIANTS, BUTTON_VARIANTS } from '../../config/constants';
import useApi from '../../hooks/useApi';
import AlertContext from '../../contexts/Alert';

export default ({
  isOpen, onClose, onDone, id
}) => {
  const api = useApi();
  const { createAlert } = AlertContext();
  const [loading, setLoading] = useState(false);

  const deleteImage = async () => {
    setLoading(true);

    try {
      await api.delete(`/api/editor/${id}/`);
    } catch (error) {
      createAlert(
        `Błąd podczas usuwania pliku ${String.fromCodePoint(0x26a0)}`,
        ALERT_VARIANTS.danger
      );

      setLoading(false);
      return;
    }

    if (onDone) {
      onDone();
    }

    createAlert('Plik usunięty pomyślnie', ALERT_VARIANTS.success);
    setLoading(false);
  };

  return (
    <Modal isOpen={isOpen} size={MODAL_SIZES.small} onClose={onClose}>
      <div style={{ marginBottom: 15 }}>Czy na pewno chcesz usunąć ten plik?</div>

      <Button variant={BUTTON_VARIANTS.danger} onClick={deleteImage} isLoading={loading}>
        Usuń plik
      </Button>
    </Modal>
  );
};
