import React, { useState } from 'react';
import AlertContext from '../../contexts/Alert';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import Field from '../../components/Field';
import useForm from '../../hooks/useForm';
import { ALERT_VARIANTS, MODAL_SIZES } from '../../config/constants';
import useApi from '../../hooks/useApi';

export default ({ isOpen, onClose, onDone }) => {
  const api = useApi({ multipart: true });
  const { createAlert } = AlertContext();

  const [file, setFile] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { field, fields, setErrors } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    const formData = new FormData();

    formData.append('pic', file);
    formData.append('pic_text', fields.pic_text || '');

    try {
      await api.post('/api/upload_image/', formData);

      setFile(null);

      if (onDone) {
        onDone();
      }

      createAlert(
        `Plik został wgrany pomyślnie ${String.fromCodePoint(0x1f386)}`,
        ALERT_VARIANTS.success
      );
    } catch (ex) {
      createAlert(
        `Błąd podczas dodawania pliku ${String.fromCodePoint(0x26a0)}`,
        ALERT_VARIANTS.danger
      );
      setErrors(ex.response.data);
    }

    setIsLoading(false);
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal isOpen={isOpen} size={MODAL_SIZES.small} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Field type="input" label="Nazwa pliku" {...field('pic_text')} />
        <Field type="file" label="Dodaj plik" error={field('pic').error} onChange={handleFile} />

        <Button type="submit" isLoading={isLoading}>
          Dodaj plik
        </Button>
      </form>
    </Modal>
  );
};
