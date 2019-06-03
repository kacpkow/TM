import React, { useContext } from 'react';
import _ from 'lodash';
import EditorContext from '../../contexts/Editor';
import Field from '../Field';
import Modal from '../Modal';
import Button from '../Button';
import { MODAL_SIZES, BUTTON_SIZES } from '../../config/constants';

const Options = () => {
  const {
    items, updateItem, focus, setFocus
  } = useContext(EditorContext);

  const item = items.find(element => element.id === focus);

  const handleInput = ({ target: { name, value } }) => {
    const preparedValue = _.isEmpty(value) || _.isNaN(Number(value)) ? value : Number(value);

    updateItem(item.id, _.set({}, name, preparedValue));
  };

  return focus ? (
    <Modal isOpen size={MODAL_SIZES.small} onClose={() => setFocus(false)}>
      <form>
        {item.editable.map(({ label, field, type }) => (
          <Field
            key={field}
            label={label}
            type={type}
            name={field}
            value={_.get(item, field)}
            onChange={handleInput}
          />
        ))}
      </form>

      <Button size={BUTTON_SIZES.medium} onClick={() => setFocus(false)}>
        Zamknij &times;
      </Button>
    </Modal>
  ) : null;
};

export default Options;
