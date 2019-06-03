import React, { useContext } from 'react';
import EditorContext from '../../contexts/Editor';

const Layers = () => {
  const { items, deleteItem, setFocus } = useContext(EditorContext);

  return (
    <div className="sidebar">
      <ul>
        {items.length > 0 ? (
          items.map(item => (
            <li key={item.id}>
              <div onClick={() => setFocus(item.id)}>{item.id}</div>

              <button type="button" onClick={() => deleteItem(item.id)}>
                &times;
              </button>
            </li>
          ))
        ) : (
          <li>Brak elementów</li>
        )}
      </ul>
    </div>
  );
};

export default Layers;
