const deletePostHandler = async (event) => {
    if (event.target.classList.contains('delete-post-btn')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/posts/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/dashboard');
        } else {
            alert('Failed to delete post');
        }
    }
};

document.querySelectorAll('.delete-post-btn').forEach(button => {
    button.addEventListener('click', deletePostHandler);
});