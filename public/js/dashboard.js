// Handling new blog posts
const newFormHandler = async (event) => {
    // Prevent page from reloading
    event.preventDefault();
    // Gathering user input for blog title and content from the form
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
    // If the title and content both exist,
    if (title && content) {
        // Send the data to the server
        const response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });
        // If the response is OK,
        if (response.ok) {
            // Redirect the user to the dashboard where the new post will display
            document.location.replace('/dashboard');
        } else {
            // If not, alert the user of the failure
            alert('Failed to create post');
        }
    }
};
// Adding an event listener to the form after defining the form handler
const form = document.querySelector('.new-post-form');
if (form) {
    form.addEventListener('submit', newFormHandler);
}