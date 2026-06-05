import { useNavigate } from 'react-router';
import { useMediaQuery } from '../hooks/useMediaQuery';

const BackButton = () => {
  const navigate = useNavigate();
  const isTablet = useMediaQuery('(max-width: 1023px)');

  return (
    <>
      {!isTablet && (
        <button
          onClick={() => navigate(-1)}
          onMouseEnter={(e) =>
            Object.assign(e.currentTarget.style, styles.buttonHover)
          }
          onMouseLeave={(e) =>
            Object.assign(e.currentTarget.style, styles.button)
          }
          style={styles.button}
          title='Go back'
          type='button'
        >
          <span style={styles.arrow}>←</span>
        </button>
      )}
    </>
  );
};

const styles = {
  arrow: {
    color: 'inherit',
    fontSize: '28px',
    fontWeight: 'bold',
    lineHeight: 1,
    marginTop: '-4px',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    border: 'none',
    borderRadius: '50%',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.12), 0 0 1px rgba(0, 0, 0, 0.15)',
    color: '#333',
    cursor: 'pointer',
    display: 'flex',
    height: '48px',
    justifyContent: 'center',
    left: '314px',
    position: 'fixed',
    top: '88px',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    width: '48px',
    zIndex: 10,
  },
  buttonHover: {
    backgroundColor: '#fdfdfd',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.16), 0 0 1px rgba(0, 0, 0, 0.2)',
    color: '#007aff',
  },
};

export default BackButton;
