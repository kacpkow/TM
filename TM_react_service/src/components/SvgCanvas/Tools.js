import React, { useContext } from 'react';
import * as Icon from 'react-feather';
import EditorContext from '../../contexts/Editor';
import Button from '../Button';
import Separator from '../Separator';

const Tools = () => {
  const {
    addText, addSquare, addCircle, addImage, saveData, saving
  } = useContext(EditorContext);

  return (
    <div className="tools">
      <Button onClick={addText}>
        <Icon.Type size={15} />
      </Button>

      <Button onClick={addSquare}>
        <Icon.Square size={15} />
      </Button>

      <Button onClick={addCircle}>
        <Icon.Circle size={15} />
      </Button>

      <Button onClick={addImage}>
        <Icon.Image size={15} />
      </Button>

      <Button onClick={saveData} isLoading={saving}>
        <Icon.Save size={15} /> Zapisz zmiany
      </Button>

      <Separator />
    </div>
  );
};

export default Tools;
