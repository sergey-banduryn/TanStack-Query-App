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
    padding: '10px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    height: '64px',
    backgroundColor: '#f5f5f5',
    borderBottom: '1px solid #ccc',
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    marginLeft: '300px',
  },
  nav: {
    width: '300px',
    height: '100vh',
    backgroundColor: '#1a1a2e',
    color: '#fff',
    padding: '20px',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.3)',
    position: 'fixed',
    left: 0,
    top: 0,
    overflowY: 'auto',
    fontFamily: "'Inter', sans-serif",
  },
  main: {
    marginLeft: '300px',
    marginTop: '64px',
    padding: '40px',
    backgroundColor: '#f8f9fa',
  },
};

export default Layout;
