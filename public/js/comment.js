// Handling new blog comments
const commentFormHandler = async (event) => {
    // Prevent page from reloading
    event.preventDefault();
    // Gathering user input for comment text from the form and the post ID it's associated with
    const comment_text = document.querySelector('#comment-text').value.trim();
    const post_id = document.querySelector('#post-id').value.trim();
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
// Adding an event listener to the form after defining the form handler
document.querySelector('.comment-form').addEventListener('submit', commentFormHandler);