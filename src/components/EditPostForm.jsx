import { useNotification } from './Notification';
import { useUpdatePost } from '../react-query/mutations';

function EditPostForm({ onCancel, post }) {
  const updateMutation = useUpdatePost(post.id);
  const notify = useNotification();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const mutationPromise = updateMutation.mutateAsync({ ...post, ...data });
      onCancel();
      await mutationPromise;
      notify('Post updated successfully');
    } catch (error) {
      notify(error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        defaultValue={post.title}
        name='title'
        placeholder='Title'
        required
        style={styles.input}
      />
      <textarea
        defaultValue={post.body}
        name='body'
        placeholder='Body'
        required
        style={styles.textarea}
      />
      <div style={styles.buttonGroup}>
        <button onClick={onCancel} style={styles.cancelBtn} type='button'>
          Cancel
        </button>
        <button style={styles.saveBtn} type='submit'>
          Save
        </button>
      </div>
    </form>
  );
}

const styles = {
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    backgroundColor: '#eee',
    border: 'none',
    borderRadius: '6px',
    color: '#333',
    cursor: 'pointer',
    fontWeight: '600',
    padding: '8px 16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontSize: '1.1rem',
    fontWeight: '600',
    padding: '10px',
  },
  saveBtn: {
    backgroundColor: '#3b82f6',
    border: 'none',
    borderRadius: '6px',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '600',
    padding: '8px 16px',
  },
  textarea: {
    border: '1px solid #ddd',
    borderRadius: '6px',
    fontFamily: 'inherit',
    fontSize: '1rem',
    minHeight: '100px',
    padding: '10px',
    resize: 'vertical',
  },
};

export default EditPostForm;
