import { useIsFetching } from '@tanstack/react-query';

function Header() {
  const isFetching = useIsFetching();

  return (
    <p style={isFetching ? styles.fetching : {}}>isFetching: {isFetching}</p>
  );
}

const styles = {
  fetching: {
    backgroundColor: 'rgb(78, 204, 163)',
  },
};

export default Header;
