import { useState } from 'react';

export default () => {
  const [fields, setFields] = useState({});
  const [errors, setErrors] = useState({});

  const onChange = (e) => {
    const { name, value } = e.target;

    setFields(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const field = name => ({
    name,
    onChange,
    value: fields[name] || '',
    error: errors[name] || false,
  });

  return {
    field,
    fields,
    setFields,
    setErrors
  };
};
