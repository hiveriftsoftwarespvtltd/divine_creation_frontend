async function test() {
  const url = 'http://localhost:9003/api/v1/auth/login';
  console.log('Sending login request to:', url);
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: 'vineetvineet8006@gmail.com',
        password: '123456'
      })
    });
    console.log('Response status:', res.status, res.statusText);
    const text = await res.text();
    console.log('Response body:', text);
  } catch (err) {
    console.error('Error fetching:', err);
  }
}
test();
