const mongoose = require('mongoose');
const User = require('./src/models/User');
const appConfig = require('./src/config/appConfig');

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(appConfig.mongoUri);
    console.log('Connected to MongoDB.');

    const adminEmail = 'admin@moviebooking.com';
    const exists = await User.findOne({ email: adminEmail });
    
    if (exists) {
      console.log('⚠️ Admin user already exists!');
      process.exit(0);
    }

    const admin = new User({
      firstName: 'System',
      lastName: 'Admin',
      email: adminEmail,
      phone: '1234567890',
      password: 'password123', // Will be hashed automatically by the pre-save hook
      role: 'admin',
      isVerified: true
    });

    await admin.save();
    console.log('✅ Admin user seeded successfully!');
    console.log(`📧 Email: ${adminEmail}`);
    console.log(`🔑 Password: password123`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding admin:', error.message);
    process.exit(1);
  }
}

seed();
