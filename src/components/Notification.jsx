import { useEffect, useState } from 'react';

const Notification = ({ children }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return <div style={styles}>{children}</div>;
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

export default Notification;
