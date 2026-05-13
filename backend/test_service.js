import mongoose from 'mongoose';
import dotenv from 'dotenv';
import * as authService from './services/auth.service.js';

dotenv.config({ path: './.env' });

async function test() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const result = await authService.loginUser({
      email: 'admin@finlearn.com',
      password: 'admin123'
    });
    console.log('Login Success:', result.user.email);
    process.exit(0);
  } catch (err) {
    console.log('Login Failed:', err.message);
    process.exit(1);
  }
}

test();
