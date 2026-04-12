import { useState, useCallback } from 'react';

const useNotification = () => {
  const [message, setMessage] = useState(null);

  const notify = useCallback((text) => {
    setMessage(text);
    setTimeout(() => setMessage(null), 3000);
  }, []);

  const notification = message ? <div style={styles}>{message}</div> : null;

  return [notify, notification];
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
};

export default useNotification;
