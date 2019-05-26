export const TEXT = {
  as: 'text',
  children: 'Example text',
  params: {
    x: 0,
    y: 15,
    rotate: 0,
    fontSize: 15,
    fill: '#000000'
  },
  editable: [
    {
      label: 'Tekst',
      field: 'children',
      type: 'text'
    },
    {
      label: 'Rozmiar czcionki',
      field: 'params.fontSize',
      type: 'number'
    },
    {
      label: 'Kolor tekstu',
      field: 'params.fill',
      type: 'color'
    },
    {
      label: 'Pozycja X',
      field: 'params.x',
      type: 'number'
    },
    {
      label: 'Pozycja Y',
      field: 'params.y',
      type: 'number'
    },
    {
      label: 'Rotacja',
      field: 'params.rotate',
      type: 'number'
    }
  ]
};

export const RECT = {
  as: 'rect',
  width: 50,
  height: 80,
  params: {
    x: 0,
    y: 0,
    rotate: 0,
    fill: '#000000'
  },
  editable: [
    {
      label: 'Kolor obiektu',
      field: 'params.fill',
      type: 'color'
    },
    {
      label: 'Szerokość',
      field: 'width',
      type: 'number'
    },
    {
      label: 'Wysokość',
      field: 'height',
      type: 'number'
    },
    {
      label: 'Pozycja X',
      field: 'params.x',
      type: 'number'
    },
    {
      label: 'Pozycja Y',
      field: 'params.y',
      type: 'number'
    },
    {
      label: 'Rotacja',
      field: 'params.rotate',
      type: 'number'
    }
  ]
};

export const CIRCLE = {
  as: 'circle',
  r: 50,
  params: {
    x: 0,
    y: 0,
    rotate: 0,
    fill: '#000000'
  },
  editable: [
    {
      label: 'Promień',
      field: 'r',
      type: 'number'
    },
    {
      label: 'Kolor obiektu',
      field: 'params.fill',
      type: 'color'
    },
    {
      label: 'Pozycja X',
      field: 'params.x',
      type: 'number'
    },
    {
      label: 'Pozycja Y',
      field: 'params.y',
      type: 'number'
    },
    {
      label: 'Rotacja',
      field: 'params.rotate',
      type: 'number'
    }
  ]
};

export const IMAGE = {
  as: 'image',
  width: 100,
  height: 100,
  xlinkHref: 'https://source.unsplash.com/random/200x200',
  params: {
    x: 0,
    y: 0,
    rotate: 0,
    fill: '#000000'
  },
  editable: [
    {
      label: 'Link',
      field: 'xlinkHref',
      type: 'text'
    },
    {
      label: 'Szerokość',
      field: 'width',
      type: 'number'
    },
    {
      label: 'Wysokość',
      field: 'height',
      type: 'number'
    },
    {
      label: 'Pozycja X',
      field: 'params.x',
      type: 'number'
    },
    {
      label: 'Pozycja Y',
      field: 'params.y',
      type: 'number'
    },
    {
      label: 'Rotacja',
      field: 'params.rotate',
      type: 'number'
    }
  ]
};
