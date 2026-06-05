import { NavLink } from 'react-router';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { routesConfig } from '../router/routesConfig';

function NavList() {
  const isTablet = useMediaQuery('(max-width: 1023px)');

  const navListStyle = {
    display: 'flex',
    flexDirection: isTablet ? 'row' : 'column',
    gap: '10px',
    listStyle: 'none',
  };

  return (
    <ul style={navListStyle}>
      {routesConfig
        .filter((route) => route.name)
        .map((route) => (
          <li key={route.path}>
            <NavLink end style={styles.link} to={route.path}>
              {route.name}
            </NavLink>
          </li>
        ))}
    </ul>
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
};

export default NavList;
