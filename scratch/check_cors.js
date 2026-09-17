async function test() {
  const url = 'http://localhost:9003/api/v1/auth/login';
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://localhost:5173'
      },
      body: JSON.stringify({
        email: 'vineetvineet8006@gmail.com',
        password: '123456'
      })
    });
    console.log('Response status:', res.status);
    console.log('Response headers:');
    for (const [key, value] of res.headers.entries()) {
      console.log(`  ${key}: ${value}`);
    }
  } catch (err) {
    console.error(err);
  }
}
test();
