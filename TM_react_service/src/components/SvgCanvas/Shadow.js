import React from 'react';
import Portal from '../Portal';

export default ({ coords, handleRotate }) => {
  if (!coords) return null;

  const {
    x, y, width, height
  } = coords;

  return (
    <Portal>
      <div
        className="shadow"
        style={{
          top: `${y - 5}px`,
          left: `${x - 5}px`,
          width: `${width + 10}px`,
          height: `${height + 10}px`
        }}
      />

      <button
        type="button"
        onClick={handleRotate}
        className="rotate-trigger"
        style={{
          left: `${x + width / 2 - 5}px`,
          top: `${y - 25}px`
        }}
      />
    </Portal>
  );
};
