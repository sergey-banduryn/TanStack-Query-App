import { useUpdatePost } from '../react-query/mutations';

function EditPostForm({ post, onCancel }) {
  const updateMutation = useUpdatePost(post.id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    try {
      const mutationPromise = updateMutation.mutateAsync({ ...post, ...data });
      onCancel();
      await mutationPromise;
    } catch (error) {
      // useNotification не успеет отобразить ошибку,
      // уже будет размонтирован из-за onCancel
      // нужно делать глобальный Notification
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <input
        name='title'
        defaultValue={post.title}
        style={styles.input}
        placeholder='Title'
      />
      <textarea
        name='body'
        defaultValue={post.body}
        style={styles.textarea}
        placeholder='Body'
      />
      <div style={styles.buttonGroup}>
        <button type='button' onClick={onCancel} style={styles.cancelBtn}>
          Cancel
        </button>
        <button type='submit' style={styles.saveBtn}>
          Save
        </button>
      </div>
    </form>
  );
}

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1.1rem',
    fontWeight: '600',
  },
  textarea: {
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ddd',
    fontSize: '1rem',
    minHeight: '100px',
    fontFamily: 'inherit',
    resize: 'vertical',
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'flex-end',
  },
  saveBtn: {
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: '600',
  },
  cancelBtn: {
    backgroundColor: '#eee',
    color: '#333',
    border: 'none',
    borderRadius: '6px',
    padding: '8px 16px',
    cursor: 'pointer',
    fontWeight: '600',
  },
};

export default EditPostForm;
