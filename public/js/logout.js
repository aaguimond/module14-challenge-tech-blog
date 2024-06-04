// Adding event listener to the logout button
document.querySelector('#logout').addEventListener('click', async (event) => {
    // Prevent page from reloading
    event.preventDefault();
    // Sends logout request to the server
    const response = await fetch('/api/user/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });
    // If the response from the server to the above request is OK,
    if (response.ok) {
        // Send the user to the homepage
        document.location.replace('/')
    } else {
        // If not, alert them of the failed logout
        alert('Failed to log out');
    }
});