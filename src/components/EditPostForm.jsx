import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePost } from '../api';
import { postKeys } from '../react-query/queryKeys';

function EditPostForm({ post, onCancel }) {
  const queryClient = useQueryClient();

  const updateMutation = useMutation({
    mutationFn: updatePost,
    onMutate: async (newPost) => {
      await queryClient.cancelQueries({ queryKey: postKeys.detail(post.id) });
      const previousPost = queryClient.getQueryData(postKeys.detail(post.id));
      queryClient.setQueryData(postKeys.detail(post.id), (old) => ({
        ...old,
        ...newPost,
      }));
      onCancel();
      return { previousPost };
    },
    onError: (err, newPost, context) => {
      queryClient.setQueryData(postKeys.detail(post.id), context.previousPost);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: postKeys.detail(post.id) });
      queryClient.refetchQueries({ queryKey: postKeys.all });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    updateMutation.mutate({ ...post, ...data });
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
