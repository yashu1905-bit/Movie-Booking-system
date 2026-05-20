// fetch is global in Node 18+
fetch('http://localhost:5000/api/bookings', {
  headers: { 'Authorization': 'Bearer mock_token_abc' }
})
.then(r => r.json())
.then(msg => console.log('INVALID TOKEN RESPONSE:', msg))
.catch(console.error);
