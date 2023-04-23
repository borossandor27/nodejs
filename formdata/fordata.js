try {
    fetch('www.example.com/submit-form', {
    method: 'POST', // Specify the HTTP method
    body: new FormData(document.querySelector('form')) // Collect form data })
    .then(response => response.text()) // Read response as text
    .then(data => alert(data)) // Alert the response } catch (error) { alert('An error occurred!'); }
    