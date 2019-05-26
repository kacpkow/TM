import React, { useContext } from 'react';
import EditorContext from '../../contexts/Editor';
import Button from '../Button';
import Separator from '../Separator';

export default () => {
  const {
    addText, addRect, addCircle, addImage, saveData
  } = useContext(EditorContext);

  return (
    <div className="tools">
      <Button onClick={addText}>Dodaj tekst</Button>
      <Button onClick={addRect}>Dodaj prostokąt</Button>
      <Button onClick={addCircle}>Dodaj koło</Button>
      <Button onClick={addImage}>Dodaj grafikę</Button>
      <Button onClick={saveData}>Zapisz</Button>

      <Separator />
    </div>
  );
};
