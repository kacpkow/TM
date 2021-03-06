import React from 'react';
import { Modal } from '../../components';

const ImageModal = ({ image, isOpen, onClose }) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="text-center">
      {image && <img className="preview" src={image} alt="Podgląd grafiki" />}
    </div>
  </Modal>
);

export default ImageModal;
