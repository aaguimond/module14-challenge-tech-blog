// Adding event listener to the login form
document.querySelector('.login-form').addEventListener('submit', async (event) => {
    // Prevent page from reloading
    event.preventDefault();
    // Take user input values from form and trim them
    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    // If email and password are truthy,
    if (email && password) {
        // Sends login info to the login request logic
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        // If the response from the server to the above request is OK,
        if (response.ok) {
            // Send the user to the homepage
            document.location.replace('/')
        } else {
            // If not, alert them of the failed login
            alert('Failed to log in');
        }
    }
});