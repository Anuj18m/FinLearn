import axios from 'axios';

async function test() {
  try {
    const res = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@finlearn.com',
      password: 'admin123'
    });
    console.log('Login Success:', res.data);
  } catch (err) {
    console.log('Login Failed:', err.response?.data || err.message);
  }
  process.exit(0);
}

test();
