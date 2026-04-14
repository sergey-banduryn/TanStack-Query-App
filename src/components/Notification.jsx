/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);

  const notify = useCallback((text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  }, []);

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      {message && <div style={styles}>{message}</div>}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  return useContext(NotificationContext);
};

const styles = {
  padding: '12px 20px',
  backgroundColor: '#333',
  color: 'rgb(78, 204, 163)',
  borderRadius: '4px',
  position: 'fixed',
  top: '80px',
  right: '20px',
  zIndex: 1000,
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  fontFamily: '"Outfit", "Inter", sans-serif',
};
