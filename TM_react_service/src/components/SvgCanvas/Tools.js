import React, { useContext } from 'react';
import * as Icon from 'react-feather';
import EditorContext from '../../contexts/Editor';
import Button from '../Button';
import Separator from '../Separator';

export default () => {
  const {
    addText, addRect, addCircle, addImage, saveData
  } = useContext(EditorContext);

  return (
    <div className="tools">
      <Button onClick={addText}><Icon.Type size={15} /></Button>
      <Button onClick={addRect}><Icon.Square size={15} /></Button>
      <Button onClick={addCircle}><Icon.Circle size={15} /></Button>
      <Button onClick={addImage}><Icon.Image size={15} /></Button>
      <Button onClick={saveData}><Icon.Save size={15} /> Zapisz zmiany</Button>

      <Separator />
    </div>
  );
};
