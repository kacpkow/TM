import React from 'react';
import { MODAL_SIZES, ALERT_VARIANTS, BUTTON_VARIANTS } from '../../config/constants';
import { useAlert } from '../../contexts/Alert';
import { Button, Modal } from '../../components';
import useFetch from '../../hooks/useFetch';

const DeleteEditorItemModal = ({
  isOpen, onClose, onDone, id
}) => {
  const { addAlert } = useAlert();

  const deleteItem = useFetch({
    url: `/api/editor/${id}/`,
    method: 'delete',
    onFetch: () => {
      if (onDone) {
        onDone();
      }

      addAlert('Plik usunięty pomyślnie', ALERT_VARIANTS.success);
    },
    onError: () => {
      addAlert('Błąd podczas usuwania pliku', ALERT_VARIANTS.danger);
    }
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose} size={MODAL_SIZES.small}>
      <div style={{ marginBottom: 15 }}>Czy na pewno chcesz usunąć ten plik?</div>

      <Button
        onClick={deleteItem.fetch}
        isLoading={deleteItem.loading}
        variant={BUTTON_VARIANTS.danger}
      >
        Usuń plik
      </Button>
    </Modal>
  );
};

export default DeleteEditorItemModal;
