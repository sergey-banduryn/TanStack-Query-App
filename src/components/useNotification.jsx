import { useCallback, useState } from 'react';

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

export default useNotification;
