// seeder.js — Seeds the database with an initial admin account
require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./models/Admin');
const connectDB = require('./config/db');

const seedAdmin = async () => {
  await connectDB();

  const existing = await Admin.findOne({ email: 'admin@gmail.com' });
  if (existing) {
    console.log('Admin already exists');
    process.exit(0);
  }

  await Admin.create({
    name: 'Admin',
    email: 'admin@gmail.com',
    password: '123456',
    role: 'superadmin',
  });

  console.log('Admin seeded: admin@gmail.com / 123456');
  process.exit(0);
};

seedAdmin();
