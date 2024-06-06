// Editing blog posts
const editFormHandler = async (event) => {
    // Prevent page from reloading
    event.preventDefault();
    // Gathering the post ID, and the user input for blog title and content from the form
    const id = document.querySelector('#post-id').value;
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    // If the title and content both exist,
    if (title && content) {
        // Send the requested edit data to the server
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        // If the response is OK,
        if (response.ok) {
            // Redirect the user to the dashboard where the edited post will display
            document.location.replace('/dashboard');
        } else {
            // If not, alert the user of the failure
            alert('Failed to update post');
        }
    }
};

// Adding an event listener to the form after defining the form handler
document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);