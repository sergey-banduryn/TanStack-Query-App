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
  spinner: {
    animation: 'spin 1s linear infinite',
    border: '3px solid #f3f3f3',
    borderRadius: '50%',
    borderTop: '3px solid #3498db',
    height: '30px',
    width: '30px',
  },
  spinnerWrapper: {
    display: 'inline-flex',
    justifyContent: 'center',
  },
};

export default Spinner;
