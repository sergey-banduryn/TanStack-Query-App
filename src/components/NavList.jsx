import { Link, NavLink } from 'react-router';
import { routesConfig } from '../router/routesConfig';

function NavList() {
  return (
    <>
      <Link to='/'>
        <div style={styles.title}>TanStack App</div>
      </Link>
      <ul style={styles.navList}>
        {routesConfig
          .filter((route) => route.name)
          .map((route) => (
            <li key={route.path} style={styles.navItem}>
              <NavLink end style={styles.link} to={route.path}>
                {route.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
}

const styles = {
  link: ({ isActive }) => ({
    backgroundColor: isActive ? 'rgba(78, 204, 163, 0.1)' : 'transparent',
    borderRadius: '8px',
    color: isActive ? '#4ecca3' : '#a2a2c2',
    display: 'block',
    fontSize: '16px',
    padding: '10px 15px',
    textDecoration: 'none',
    transition: 'all 0.3s ease',
  }),
  navItem: {
    marginBottom: '10px',
  },
  navList: {
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  title: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#4ecca3',
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '1px',
    marginBottom: '30px',
    paddingBottom: '15px',
    textAlign: 'center',
  },
};

export default NavList;
