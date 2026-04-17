import { Outlet } from 'react-router';
import Header from './Header';
import NavList from './NavList';

const Layout = () => {
  return (
    <>
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
    </>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    margin: '0 auto',
    maxWidth: '600px',
    padding: '10px',
  },
  header: {
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ccc',
    height: '64px',
    left: 0,
    marginLeft: '300px',
    position: 'fixed',
    right: 0,
    top: 0,
  },
  main: {
    backgroundColor: '#f8f9fa',
    marginLeft: '300px',
    marginTop: '64px',
    minWidth: '400px',
    padding: '40px',
  },
  nav: {
    backgroundColor: '#1a1a2e',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
    color: '#fff',
    fontFamily: '"Inter", sans-serif',
    height: '100vh',
    left: 0,
    overflowY: 'auto',
    padding: '20px',
    position: 'fixed',
    top: 0,
    width: '300px',
  },
};

export default Layout;
