import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';

dotenv.config({ path: './.env' });

async function check() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const user = await User.findOne({ email: 'admin@finlearn.com' });
    console.log('User found:', user ? user.email : 'NOT FOUND');
    if (user) {
        console.log('Role:', user.role);
        console.log('Password hash exists:', !!user.password);
    }
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

check();
