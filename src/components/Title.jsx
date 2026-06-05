import { Link } from 'react-router';

function Title() {
  return (
    <Link to='/'>
      <div style={styles.title}>TanStack App</div>
    </Link>
  );
}

const styles = {
  title: {
    alignItems: 'center',
    color: '#4ecca3',
    display: 'flex',
    fontSize: '24px',
    fontWeight: 'bold',
    justifyContent: 'center',
    letterSpacing: '1px',
  },
};

export default Title;
