fetch('http://localhost:5000/api/auth/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'angelina@example.com', password: 'password123' })
})
  .then(r => r.json())
  .then(data => {
    console.log("LOGIN:", data.success ? "SUCCESS" : data);
    const token = data.data.accessToken;
    return fetch('http://localhost:5000/api/bookings', {
      headers: { 'Authorization': 'Bearer ' + token }
    });
  })
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
