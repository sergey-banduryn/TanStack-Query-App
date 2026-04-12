import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postKeys } from '../react-query/queryKeys';
import { createPost } from '../api';
import useNotification from './useNotification';

let id = 100;
let userId = 1;

function CreatePost() {
  const queryClient = useQueryClient();
  const [notify, notification] = useNotification();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const mutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.all });
      setTitle('');
      setBody('');
      notify('Post created successfully');
    },
    onError: () => {
      notify('Error creating post');
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    id++;
    mutation.mutate({ title, body, userId, id });
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
            id='title'
            type='text'
            placeholder='Enter post title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={styles.input}
            disabled={mutation.isPending}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label htmlFor='body' style={styles.label}>
            Content
          </label>
          <textarea
            id='body'
            placeholder='What is on your mind?'
            value={body}
            onChange={(e) => setBody(e.target.value)}
            style={{ ...styles.input, ...styles.textarea }}
            disabled={mutation.isPending}
            required
          />
        </div>
        <button
          type='submit'
          style={{
            ...styles.button,
            ...(mutation.isPending ? styles.buttonDisabled : {}),
          }}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? 'Creating...' : 'Create Post'}
        </button>
      </form>
      {notification}
    </div>
  );
}

const styles = {
  container: {
    backgroundColor: '#ffffff',
    padding: '32px',
    borderRadius: '16px',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
    maxWidth: '500px',
    margin: '20px auto',
    fontFamily: '"Outfit", "Inter", sans-serif',
  },
  title: {
    margin: '0 0 24px 0',
    fontSize: '24px',
    fontWeight: '700',
    color: '#1a1a2e',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#4a5568',
  },
  input: {
    padding: '12px 16px',
    borderRadius: '8px',
    border: '1px solid #e2e8f0',
    fontSize: '16px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    backgroundColor: '#f8fafc',
  },
  textarea: {
    minHeight: '120px',
    resize: 'vertical',
  },
  button: {
    padding: '14px',
    borderRadius: '12px',
    border: 'none',
    backgroundColor: '#4f46e5',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'background-color 0.2s, transform 0.1s',
    boxShadow: '0 4px 6px -1px rgba(79, 70, 229, 0.2)',
  },
  buttonDisabled: {
    backgroundColor: '#9ca3af',
    cursor: 'not-allowed',
    boxShadow: 'none',
  },
  errorText: {
    color: '#ef4444',
    fontSize: '14px',
    marginTop: '12px',
    textAlign: 'center',
  },
};

export default CreatePost;
