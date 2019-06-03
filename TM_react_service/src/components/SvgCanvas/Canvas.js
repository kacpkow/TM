import React, { useContext, useState } from 'react';
import { useGesture } from 'react-with-gesture';
import EditorContext from '../../contexts/Editor';
import Tag from './Tag';

const Canvas = () => {
  const { items, updateItem, setFocus } = useContext(EditorContext);
  const [drag, setDrag] = useState(false);

  const bind = useGesture((e) => {
    const {
      args: [id, prevX, prevY],
      delta,
      direction
    } = e;

    updateItem(id, {
      params: {
        x: prevX + delta[0],
        y: prevY + delta[1]
      }
    });

    setDrag(direction.some(item => item !== 0));
  });

  return (
    <>
      <Tag
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="canvas"
        width="600"
        height="450"
        style={{ background: '#fff' }}
      >
        <Tag as="rect" width="100%" height="100%" x="0" y="0" fill="#fff" />

        {items.map(({
          id, params, editable, ...rest
        }) => (
          <Tag
            as="g"
            key={id}
            onClick={() => {
              if (!drag) {
                setFocus(id);
              }
            }}
            className="drag"
            style={{
              fill: params.fill,
              fontSize: params.fontSize,
              transform: `translate(${params.x}px, ${params.y}px) rotate(${params.rotate}deg)`
            }}
            {...bind(id, params.x, params.y)}
          >
            <Tag {...rest} />
          </Tag>
        ))}
      </Tag>
    </>
  );
};

export default Canvas;
