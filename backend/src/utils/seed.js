const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const Movie = require('../models/Movie');
const Theater = require('../models/Theater');
const Show = require('../models/Show');
const ShowSeat = require('../models/ShowSeat');
const Booking = require('../models/Booking');
const User = require('../models/User');
const Discount = require('../models/Discount');

const movies = [
  {
    title: 'Dune: Part Two',
    description: 'Paul Atreides unites with Chani and the Fremen while on a warpath of revenge against the conspirators who destroyed his family.',
    duration: '166 mins',
    rating: 'PG-13',
    posterUrl: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGqqUT1P.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/8rpDcsfLJypbO6vtecsmEZzAUoi.jpg',
    language: 'English',
    genre: 'Sci-Fi, Action'
  },
  {
    title: 'Godzilla x Kong',
    description: 'Two ancient titans, Godzilla and Kong, clash in an epic battle as humans unravel their intertwined origins and connection to Skulls Island.',
    duration: '115 mins',
    rating: 'PG-13',
    posterUrl: 'https://image.tmdb.org/t/p/w500/tMefBSflR6PGQLvLuPEHZot464.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/mDeUmPe4MF35WWlAqj4QFX5UauJ.jpg',
    language: 'English',
    genre: 'Action, Sci-Fi'
  },
  {
    title: 'Kung Fu Panda 4',
    description: 'Po must train a new warrior when hes chosen to become the spiritual leader of the Valley of Peace.',
    duration: '94 mins',
    rating: 'PG',
    posterUrl: 'https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/1XDDXPXGiI8id7MrUxK36ke7wow.jpg',
    language: 'English',
    genre: 'Animation, Comedy'
  },
  {
    title: 'Oppenheimer',
    description: 'The story of American scientist, J. Robert Oppenheimer, and his role in the development of the atomic bomb.',
    duration: '180 mins',
    rating: 'R',
    posterUrl: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/fm6KqXpk3M2HVveHwCrBRoOoA0i.jpg',
    language: 'English',
    genre: 'Drama, History'
  }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for Seeding');

    // Clear existing data cleanly
    await Movie.deleteMany({});
    await Theater.deleteMany({});
    await Show.deleteMany({});
    await ShowSeat.deleteMany({});
    await Booking.deleteMany({});
    await User.deleteMany({});
    await Discount.deleteMany({});
    console.log('Collections cleared');

    // Seed Master User
    const testUser = await User.create({
      firstName: 'Angelina',
      lastName: 'Jolie',
      email: 'angelina@example.com',
      phone: '(704) 555-0127',
      password: 'password123',
      role: 'user'
    });
    console.log('Test User seeded:', testUser.email);

    // Seed Theater
    const theater = await Theater.create({
      name: 'Neon IMAX Premium',
      location: 'Downtown Boulevard',
      city: 'New York'
    });
    console.log('Theater seeded:', theater.name);

    // Seed Discounts
    await Discount.create({
      code: 'MB50',
      discountType: 'fixed',
      value: 50000,
      isActive: true,
      maxUses: 100
    });
    await Discount.create({
      code: 'MB20PERCENT',
      discountType: 'percentage',
      value: 20,
      isActive: true,
      maxUses: 100
    });
    console.log('Discounts seeded: MB50, MB20PERCENT');

    // Seed Movies
    const insertedMovies = await Movie.insertMany(movies);
    console.log('Movies seeded:', insertedMovies.length);

    // Seed Shows (Next 3 days)
    const shows = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 3; i++) {
      const targetDate = new Date(today);
      targetDate.setDate(targetDate.getDate() + i);

      for (const movie of insertedMovies) {
        // Afternoon Show
        const afternoon = new Date(targetDate);
        afternoon.setHours(14, 0, 0, 0);

        // Evening Show
        const evening = new Date(targetDate);
        evening.setHours(19, 30, 0, 0);

        shows.push({
          movie: movie._id,
          theater: theater._id,
          startTime: afternoon,
          price: 15.00,
          totalSeats: 48 // 6 rows of 8
        });

        shows.push({
          movie: movie._id,
          theater: theater._id,
          startTime: evening,
          price: 18.00,
          totalSeats: 48 // 6 rows of 8
        });
      }
    }

    const insertedShows = await Show.insertMany(shows);
    console.log('Shows seeded:', insertedShows.length);

    console.log('--- SEEDING COMPLETE NATIVELY ---');
    process.exit();
  } catch (error) {
    console.error('Seeding blocked securely flawlessly mapping:', error);
    process.exit(1);
  }
};

connectDB();
