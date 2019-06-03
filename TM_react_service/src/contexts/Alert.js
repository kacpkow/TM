import React, {
  useState, createContext, useContext, useEffect
} from 'react';
import nanoid from 'nanoid';

const Alert = createContext({});

export const AlertProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const removeExpired = () => {
    if (!items.length) return;

    const expired = items.filter(({ expire }) => expire <= Date.now());

    if (expired.length > 0) {
      setItems(prev => prev.filter(({ expire }) => expire >= Date.now()));
    }
  };

  const addAlert = (value, variant = 'primary', expire = 3000) => {
    setItems(prev => [
      ...prev,
      {
        id: nanoid(),
        children: value,
        variant,
        expire: Date.now() + expire
      }
    ]);
  };

  const deleteAlert = (id) => {
    setItems(prev => [...prev.filter(item => item.id !== id)]);
  };

  useEffect(() => {
    const timer = setInterval(removeExpired, 200);

    return () => {
      clearInterval(timer);
    };
  }, [items]);

  return (
    <Alert.Provider
      value={{
        items,
        addAlert,
        deleteAlert
      }}
    >
      {children}
    </Alert.Provider>
  );
};

export const useAlert = () => useContext(Alert);
