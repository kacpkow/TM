import React, { useState } from 'react';
import { ALERT_VARIANTS, MODAL_SIZES } from '../../config/constants';
import { useAlert } from '../../contexts/Alert';
import useForm from '../../hooks/useForm';
import useFetch from '../../hooks/useFetch';
import { Button, Field, Modal } from '../../components';

const UploadModal = ({ isOpen, onClose, onDone }) => {
  const { addAlert } = useAlert();
  const [file, setFile] = useState([]);
  const {
    field, fields, setErrors, setFields
  } = useForm();

  const uploadFile = useFetch({
    url: '/api/upload_image/',
    contentType: 'multipart/form-data',
    method: 'post',
    onFetch: () => {
      if (onDone) {
        onDone();
      }

      setFields({});
      setFile([]);

      addAlert('Plik został wgrany pomyślnie', ALERT_VARIANTS.success);
    },
    onError: (error) => {
      addAlert('Błąd podczas dodawania pliku', ALERT_VARIANTS.danger);
      setErrors(error.response.data);
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('pic', file);
    data.append('pic_text', fields.pic_text || '');

    uploadFile.fetch({
      data
    });
  };

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <Modal isOpen={isOpen} size={MODAL_SIZES.small} onClose={onClose}>
      <form onSubmit={handleSubmit}>
        <Field type="input" label="Nazwa pliku" {...field('pic_text')} />
        <Field type="file" label="Dodaj plik" error={field('pic').error} onChange={handleFile} />

        <Button type="submit" isLoading={uploadFile.loading}>
          Dodaj plik
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
