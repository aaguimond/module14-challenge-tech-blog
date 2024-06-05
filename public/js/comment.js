// Handling new blog comments
const commentFormHandler = async (event) => {
    // Prevent page from reloading
    event.preventDefault();
    
    const form = event.target;
    // Gathering user input for comment text from the form and the post ID it's associated with
    const comment_text = form.querySelector('textarea[name="comment-text"]').value.trim();
    const post_id = form.querySelector('input[name="post-id"]').value.trim();
    // If the comment text and post both exist,
    if (comment_text && post_id) {
        // Send the data to the server
        const response = await fetch('/api/comments', {
            method: 'POST',
            body: JSON.stringify({ comment_text, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });
        // If the response is OK,
        if (response.ok) {
            // Reload the page where the new comment will display on the post
            document.location.reload();
        } else {
            // If not, alert the user of the failure
            alert('Failed to add comment');
        }
    }
};

const deleteCommentHandler = async (event) => {
    if (event.target.classList.contains('delete-comment-btn')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/comments/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete comment');
        }
    }
};
// Adding an event listener to the form after defining the form handler
document.querySelectorAll('.comment-form').forEach(form => {
    form.addEventListener('submit', commentFormHandler);
});

document.querySelectorAll('.delete-comment-btn').forEach(button => {
    button.addEventListener('click', deleteCommentHandler);
});