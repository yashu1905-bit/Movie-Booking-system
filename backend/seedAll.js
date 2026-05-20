require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./src/models/User');
const Movie = require('./src/models/Movie');
const Theater = require('./src/models/Theater');
const Show = require('./src/models/Show');
const Booking = require('./src/models/Booking');
const appConfig = require('./src/config/appConfig');

async function seedDatabase() {
  try {
    console.log('🔗 Connecting to MongoDB...');
    await mongoose.connect(appConfig.mongoUri);
    console.log('✅ Connected to MongoDB.');

    console.log('🧹 Clearing existing collections...');
    await Promise.all([
      User.deleteMany({}),
      Movie.deleteMany({}),
      Theater.deleteMany({}),
      Show.deleteMany({}),
      Booking.deleteMany({})
    ]);

    // 1. Seed Users
    console.log('👤 Seeding Users...');
    const admin = await User.create({
      firstName: 'System', lastName: 'Admin', email: 'admin@moviebooking.com', phone: '1234567890', password: 'password123', role: 'admin', isVerified: true
    });
    const user1 = await User.create({
      firstName: 'John', lastName: 'Doe', email: 'john@example.com', phone: '1231231234', password: 'password123', role: 'user', isVerified: true
    });
    const user2 = await User.create({
      firstName: 'Sarah', lastName: 'Smith', email: 'sarah@example.com', phone: '4564564567', password: 'password123', role: 'user', isVerified: true
    });
    const user3 = await User.create({
      firstName: 'Mike', lastName: 'Johnson', email: 'mike@example.com', phone: '7897897890', password: 'password123', role: 'user', isVerified: true
    });

    // 2. Seed Movies
    console.log('🎬 Seeding Movies...');
    const movie1 = await Movie.create({
      title: 'Dune: Part Two', description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.', duration: '166 mins', rating: 'PG-13',
      posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGqqUT1O.jpg', bannerUrl: 'https://image.tmdb.org/t/p/w1280/8rpDcsfLJypbO6vtecsm1p2q31V.jpg', language: 'English', genre: 'Sci-Fi'
    });
    const movie2 = await Movie.create({
      title: 'Kung Fu Panda 4', description: 'After Po is tapped to become the Spiritual Leader of the Valley of Peace, he needs to find and train a new Dragon Warrior.', duration: '94 mins', rating: 'PG',
      posterUrl: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg', bannerUrl: 'https://image.tmdb.org/t/p/w1280/1XDDXPXGiI8id7MrUxK36ke7bbC.jpg', language: 'English', genre: 'Animation'
    });
    const movie3 = await Movie.create({
      title: 'Godzilla x Kong', description: 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins.', duration: '115 mins', rating: 'PG-13',
      posterUrl: 'https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLvLuPEHZotG.jpg', bannerUrl: 'https://image.tmdb.org/t/p/w1280/4fEZ2aOkjXU3Z0g77q3b2iC.jpg', language: 'English', genre: 'Action'
    });
    const movie4 = await Movie.create({
      title: 'Ghostbusters: Frozen Empire', description: 'When the discovery of an ancient artifact unleashes an evil force, Ghostbusters new and old must join forces to protect their home.', duration: '115 mins', rating: 'PG-13',
      posterUrl: 'https://image.tmdb.org/t/p/w500/stmYfCUGd8Iy6ISFA4WGxZy0pzY.jpg', bannerUrl: 'https://image.tmdb.org/t/p/w1280/x2RS3G338z65P8V3eLqH7NpxE6i.jpg', language: 'English', genre: 'Comedy'
    });
    
    // 3. Seed Theaters
    console.log('🏢 Seeding Theaters...');
    const theater1 = await Theater.create({ name: 'Downtown Cinema Plus', location: '123 Main St', city: 'New York' });
    const theater2 = await Theater.create({ name: 'Grand Plaza IMAX', location: '789 East Ave', city: 'Chicago' });
    const theater3 = await Theater.create({ name: 'Starlight Drive-in', location: '456 West Blvd', city: 'Los Angeles' });

    // 4. Seed Shows
    console.log('📅 Seeding Shows...');
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const dateGen = (monthOffset) => new Date(currentYear, currentMonth - monthOffset, 15, 18, 30);
    
    const show1 = await Show.create({ movie: movie1._id, theater: theater1._id, startTime: dateGen(0), price: 18.00, totalSeats: 200 });
    const show2 = await Show.create({ movie: movie2._id, theater: theater2._id, startTime: dateGen(1), price: 12.50, totalSeats: 120 });
    const show3 = await Show.create({ movie: movie3._id, theater: theater3._id, startTime: dateGen(2), price: 15.00, totalSeats: 300 });
    const show4 = await Show.create({ movie: movie4._id, theater: theater2._id, startTime: dateGen(0), price: 18.00, totalSeats: 250 });
    const show5 = await Show.create({ movie: movie1._id, theater: theater3._id, startTime: dateGen(3), price: 20.00, totalSeats: 150 });

    // 5. Seed Bookings
    console.log('🎟️ Seeding Bookings...');
    const bkgGen = async (userId, showId, seats, amount, status, monthOffset) => {
      const b = await Booking.create({
        userId, showId, seats, totalAmount: amount, paymentStatus: status === 'cancelled' ? 'failed' : 'completed', status
      });
      // forcibly backdate createdAt to trigger realistic analytics graphs
      await Booking.updateOne({ _id: b._id }, { $set: { createdAt: dateGen(monthOffset) } });
    };

    await bkgGen(user1._id, show1._id, ['A1', 'A2', 'A3'], 54.00, 'confirmed', 0); // This Month
    await bkgGen(user2._id, show2._id, ['B5', 'B6'], 25.00, 'confirmed', 1); // Last Month
    await bkgGen(user3._id, show3._id, ['C1'], 15.00, 'cancelled', 2); // 2 Months Ago
    await bkgGen(user1._id, show4._id, ['VIP1', 'VIP2'], 36.00, 'confirmed', 0); // This Month
    await bkgGen(user2._id, show5._id, ['D4'], 20.00, 'confirmed', 3); // 3 Months Ago
    await bkgGen(user3._id, show1._id, ['A9', 'A10'], 36.00, 'confirmed', 0); // This Month
    await bkgGen(user1._id, show2._id, ['C2'], 12.50, 'confirmed', 1); // Last Month

    console.log('🎉 All models seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    process.exit(1);
  }
}

seedDatabase();
