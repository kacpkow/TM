import React, { useState, useEffect, useRef } from 'react';
import nanoid from 'nanoid';
import _ from 'lodash';
import EditorContext from '../../contexts/Editor';
import Tools from './Tools';
import Canvas from './Canvas';
import Layers from './Layers';
import Options from './Options';
import {
  TEXT, RECT, CIRCLE, IMAGE
} from '../../config/elements';
import UploadGridModal from '../../views/partials/UploadGridModal';

import './style.scss';

export default ({ initialValue = [], save }) => {
  const canvasRef = useRef(null);
  const [items, setItems] = useState(initialValue);
  const [focus, setFocus] = useState(null);
  const [isUploadModal, setIsUploadModal] = useState(false);

  const addItem = config => setItems([
    ...items,
    {
      id: nanoid(),
      ...config
    }
  ]);

  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
    setFocus(null);
  };

  const addText = () => addItem(TEXT);
  const addRect = () => addItem(RECT);
  const addCircle = () => addItem(CIRCLE);
  const addImage = () => setIsUploadModal(true); // addItem(IMAGE);

  const updateItem = (id, opts) => {
    setItems(prev => prev.map((item) => {
      if (item.id === id) {
        return _.merge({}, item, opts);
      }

      return item;
    }));
  };

  const saveData = () => {
    if (save) {
      save({
        config: items,
        source: canvasRef.current.innerHTML
      });
    }
  };

  useEffect(() => {
    setItems(initialValue);
  }, [initialValue]);

  return (
    <EditorContext.Provider
      value={{
        items,
        deleteItem,
        addText,
        addRect,
        addCircle,
        addImage,
        updateItem,
        saveData,
        focus,
        setFocus
      }}
    >
      <UploadGridModal
        isOpen={isUploadModal}
        onClose={() => setIsUploadModal(false)}
        onSelect={(url) => {
          addItem({
            ...IMAGE,
            xlinkHref: url
          });
        }}
      />

      <div className="editor">
        <Tools />
        <div ref={canvasRef}>
          <Canvas />
        </div>
        <Layers />
        <Options />
      </div>
    </EditorContext.Provider>
  );
};
