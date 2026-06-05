import { useState } from 'react';
import { useNotification } from './Notification';
import { useCreatePost } from '../react-query/mutations';

let id = 100;
let userId = 1;

function CreatePost() {
  const notify = useNotification();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const mutation = useCreatePost();

  const handleSubmit = async (e) => {
    e.preventDefault();
    id++;

    try {
      await mutation.mutateAsync({ body, id, title, userId });
      setTitle('');
      setBody('');
      notify('Post created successfully');
    } catch (error) {
      notify(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create New Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.inputGroup}>
          <label htmlFor='title' style={styles.label}>
            Title
          </label>
          <input
            disabled={mutation.isPending}
            id='title'
            onChange={(e) => setTitle(e.target.value)}
            placeholder='Enter post title'
            required
            style={styles.input}
            type='text'
            value={title}
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor='body' style={styles.label}>
            Content
          </label>
          <textarea
            disabled={mutation.isPending}
            id='body'
            onChange={(e) => setBody(e.target.value)}
            placeholder='What is on your mind?'
            required
            style={{ ...styles.input, ...styles.textarea }}
            value={body}
          />
        </div>
        <button
          disabled={mutation.isPending}
          style={{
            ...styles.button,
            ...(mutation.isPending ? styles.buttonDisabled : {}),
          }}
          type='submit'
        >
          {mutation.isPending ? 'Creating...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
}

const styles = {
  button: {
    backgroundColor: '#4f46e5',
    border: 'none',
    borderRadius: '12px',
    boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
    color: 'white',
    cursor: 'pointer',
    fontSize: '16px',
    fontWeight: '600',
    padding: '14px',
    transition: 'background-color 0.2s, transform 0.1s',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    boxShadow: 'none',
    cursor: 'not-allowed',
  },
  container: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    margin: '20px auto',
    maxWidth: '500px',
    padding: '32px',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '14px',
    marginTop: '12px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  input: {
    backgroundColor: '#f8fafc',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '16px',
    outline: 'none',
    padding: '12px 16px',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    color: '#4a5568',
    fontSize: '14px',
    fontWeight: '600',
  },
  textarea: {
    minHeight: '120px',
    resize: 'vertical',
  },
  title: {
    color: '#1a1a2e',
    fontSize: '24px',
    fontWeight: '700',
    margin: '0 0 24px 0',
    textAlign: 'center',
  },
};

export default CreatePost;
