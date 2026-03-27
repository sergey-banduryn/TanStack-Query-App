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
              <NavLink to={route.path} style={styles.link} end>
                {route.name}
              </NavLink>
            </li>
          ))}
      </ul>
    </>
  );
}

const styles = {
  navList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  navItem: {
    marginBottom: '10px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '30px',
    color: '#4ecca3',
    letterSpacing: '1px',
    textAlign: 'center',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    paddingBottom: '15px',
  },
  link: ({ isActive }) => ({
    textDecoration: 'none',
    color: isActive ? '#4ecca3' : '#a2a2c2',
    fontSize: '16px',
    padding: '10px 15px',
    borderRadius: '8px',
    display: 'block',
    transition: 'all 0.3s ease',
    backgroundColor: isActive ? 'rgba(78, 204, 163, 0.1)' : 'transparent',
  }),
};

export default NavList;
