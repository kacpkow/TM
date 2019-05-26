import React from 'react';
import Modal from '../../components/Modal';

export default ({
  image, isOpen, onClose, children
}) => (
  <Modal isOpen={isOpen} onClose={onClose}>
    <div className="text-center">
      {image && <img className="preview" src={image} alt="Podgląd grafiki" />}
      {children && <div dangerouslySetInnerHTML={{ __html: children }} />}
    </div>
  </Modal>
);
