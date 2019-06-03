import React, { useState, useEffect, useRef } from 'react';
import nanoid from 'nanoid';
import _ from 'lodash';
import EditorContext from '../../contexts/Editor';
import Tools from './Tools';
import Canvas from './Canvas';
import Layers from './Layers';
import Options from './Options';
import {
  TEXT, SQUARE, CIRCLE, IMAGE
} from '../../config/elements';
import UploadGridModal from '../../screens/partials/UploadGridModal';

import './style.scss';

const Editor = ({
  initialValue = [], save, saving = false, afterTools: AfterTools
}) => {
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
  const addSquare = () => addItem(SQUARE);
  const addCircle = () => addItem(CIRCLE);
  const addImage = () => setIsUploadModal(true);

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
        addSquare,
        addCircle,
        addImage,
        updateItem,
        saveData,
        focus,
        setFocus,
        saving
      }}
    >
      <UploadGridModal
        isOpen={isUploadModal}
        onClose={() => setIsUploadModal(false)}
        onSelect={(url) => {
          setIsUploadModal(false);
          addItem({
            ...IMAGE,
            xlinkHref: url
          });
        }}
      />

      <div className="editor">
        <Tools />
        <AfterTools />
        <div ref={canvasRef}>
          <Canvas />
        </div>
        <Layers />
        <Options />
      </div>
    </EditorContext.Provider>
  );
};

export default Editor;
