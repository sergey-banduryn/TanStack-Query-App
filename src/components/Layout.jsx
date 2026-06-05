import { Outlet } from 'react-router';
import Header from './Header';
import NavList from './NavList';
import Title from './Title';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Layout = () => {
  const isTablet = useMediaQuery('(max-width: 1023px)');

  const gridStyle = {
    display: 'grid',
    gridTemplateAreas: isTablet ? '"t" "n" "h" "m"' : '"t h" "n m"',
    gridTemplateColumns: isTablet ? '1fr' : '300px 1fr',
    gridTemplateRows: isTablet ? '64px auto auto 1fr' : '64px 1fr',
    height: '100dvh',
  };

  return (
    <div style={gridStyle}>
      <div style={styles.title}>
        <Title />
      </div>
      <header style={styles.header}>
        <Header />
      </header>
      <nav style={styles.nav}>
        <NavList />
      </nav>
      <main style={styles.main}>
        <div style={styles.container}>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

const styles = {
  container: {
    margin: '0 auto',
    maxWidth: '600px',
    padding: '10px',
  },
  header: {
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ccc',
    gridArea: 'h',
  },
  main: {
    backgroundColor: '#f8f9fa',
    gridArea: 'm',
    overflowY: 'auto',
  },
  nav: {
    backgroundColor: '#1a1a2e',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
    gridArea: 'n',
    overflowX: 'auto',
    padding: '20px',
  },
  title: {
    alignItems: 'center',
    backgroundColor: '#1a1a2e',
    display: 'flex',
    gridArea: 't',
    justifyContent: 'center',
  },
};

export default Layout;
