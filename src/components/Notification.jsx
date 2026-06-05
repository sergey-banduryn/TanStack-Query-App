/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useState } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

const NotificationContext = createContext();

const NotificationProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const isTablet = useMediaQuery('(max-width: 1023px)');

  const notify = useCallback((text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  }, []);

  const adaptiveStyles = {
    top: isTablet ? '180px' : '80px',
  };

  return (
    <NotificationContext.Provider value={notify}>
      {children}
      {message && <div style={{ ...styles, ...adaptiveStyles }}>{message}</div>}
    </NotificationContext.Provider>
  );
};

const useNotification = () => {
  return useContext(NotificationContext);
};

const styles = {
  backgroundColor: '#333',
  borderRadius: '4px',
  boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
  color: 'rgb(78, 204, 163)',
  padding: '12px 20px',
  position: 'fixed',
  right: '20px',
  top: '80px',
  zIndex: 1000,
};

export { NotificationProvider, useNotification };
