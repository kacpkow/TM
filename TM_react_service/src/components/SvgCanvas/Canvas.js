import React, { useContext, useState, useEffect } from 'react';
import { useGesture } from 'react-with-gesture';
import EditorContext from '../../contexts/Editor';
import Shadow from './Shadow';
import Tag from './Tag';

export default () => {
  const [shadow, setShadow] = useState(null);
  const {
    items, updateItem, focus, setFocus
  } = useContext(EditorContext);
  const [drag, setDrag] = useState(false);

  useEffect(() => {
    if (!focus) {
      setShadow(null);
    }
  }, [focus]);

  const bind = useGesture((e) => {
    const {
      args: [id, prevX, prevY],
      delta,
      target,
      direction
    } = e;

    updateItem(id, {
      params: {
        x: prevX + delta[0],
        y: prevY + delta[1]
      }
    });

    setDrag(direction.some(item => item !== 0));

    setShadow(target.getBoundingClientRect());
  });

  const handleRotate = () => {
    alert('Rotate!');
    // Math.atan2(e.pageX - elementCenterX, -(e.pageY - elementCenterY)) * (180 / Math.PI);
  };

  return (
    <>
      {/* <Shadow coords={shadow} handleRotate={handleRotate} /> */}

      <Tag
        as="svg"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="canvas"
        width="600"
        height="400"
      >
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
