import { useSearchParams } from 'react-router';
import { useMediaQuery } from '../hooks/useMediaQuery';

const Pagination = ({ meta = {} }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const isTablet = useMediaQuery('(max-width: 1023px)');

  const currentPage = parseInt(searchParams.get('page') || '1', 10);
  const { totalPages = 0 } = meta;

  const handlePageChange = (page) => {
    setSearchParams((params) => {
      if (page === 1) {
        params.delete('page');
        params.delete('limit');
      } else {
        params.set('page', page);
      }

      return params;
    });
  };

  const getPages = () => {
    const pages = [];
    const maxVisible = isTablet ? 1 : 3;

    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div style={styles.container}>
      <button
        disabled={currentPage === 1}
        onClick={() => handlePageChange(currentPage - 1)}
        style={{
          ...styles.button,
          ...(currentPage === 1 ? styles.disabled : {}),
        }}
      >
        &lsaquo; Previous
      </button>

      <div style={styles.pageList}>
        {getPages()[0] > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              style={styles.pageButton}
            >
              1
            </button>
            {getPages()[0] > 2 && <span style={styles.ellipsis}>...</span>}
          </>
        )}

        {getPages().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            style={{
              ...styles.pageButton,
              ...(currentPage === page ? styles.activeButton : {}),
            }}
          >
            {page}
          </button>
        ))}

        {getPages()[getPages().length - 1] < totalPages && (
          <>
            {getPages()[getPages().length - 1] < totalPages - 1 && (
              <span style={styles.ellipsis}>...</span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              style={styles.pageButton}
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        disabled={currentPage === totalPages}
        onClick={() => handlePageChange(currentPage + 1)}
        style={{
          ...styles.button,
          ...(currentPage === totalPages ? styles.disabled : {}),
        }}
      >
        Next &rsaquo;
      </button>
    </div>
  );
};

const styles = {
  activeButton: {
    backgroundColor: '#3b82f6',
    borderColor: '#3b82f6',
    boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.3)',
    color: '#ffffff',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: '#333',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '14px',
    fontWeight: '500',
    justifyContent: 'center',
    outline: 'none',
    padding: '8px 16px',
    transition: 'all 0.2s ease',
  },
  container: {
    alignItems: 'center',
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
    marginTop: '30px',
    padding: '20px 0',
  },
  disabled: {
    backgroundColor: '#f9fafb',
    cursor: 'not-allowed',
    opacity: '0.5',
  },
  ellipsis: {
    color: '#9ca3af',
    padding: '0 4px',
  },
  pageButton: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor: '#e0e0e0',
    borderRadius: '8px',
    borderStyle: 'solid',
    borderWidth: '1px',
    color: '#333',
    cursor: 'pointer',
    display: 'flex',
    fontSize: '14px',
    fontWeight: '500',
    height: '40px',
    justifyContent: 'center',
    outline: 'none',
    transition: 'all 0.2s ease',
    width: '40px',
  },
  pageList: {
    alignItems: 'center',
    display: 'flex',
    gap: '8px',
  },
};

export default Pagination;
