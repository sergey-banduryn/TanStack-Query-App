const Spinner = () => (
  <div style={styles.spinnerWrapper}>
    <div style={styles.spinner}></div>
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

const styles = {
  spinnerWrapper: {
    display: 'inline-flex',
    justifyContent: 'center',
  },
  spinner: {
    width: '30px',
    height: '30px',
    border: '3px solid #f3f3f3',
    borderTop: '3px solid #3498db',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
  },
};

export default Spinner;
