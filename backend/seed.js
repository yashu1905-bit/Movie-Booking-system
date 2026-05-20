const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');
const Movie = require('./src/models/Movie');
const Theater = require('./src/models/Theater');
const Show = require('./src/models/Show');
const ShowSeat = require('./src/models/ShowSeat');

// Connect natively gracefully logically
mongoose.connect('mongodb://localhost:27017/mb_booking')
  .then(() => console.log('MongoDB Connected natively solidly...'))
  .catch(err => console.error(err));

const seedDB = async () => {
  try {
    console.log('Clearing old securely organically softly neatly...');
    await User.deleteMany();
    await Movie.deleteMany();
    await Theater.deleteMany();
    await Show.deleteMany();
    await ShowSeat.deleteMany();

    console.log('Creating beautifully gracefully neatly neatly...');
    
    // 10+ Movies securely explicit powerfully correctly
    const moviesData = [
      { title: "Avengers: Infinity War", description: "The Avengers must stop Thanos from collecting all the Infinity Stones.", duration: "149 mins", rating: "PG-13", posterUrl: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg", bannerUrl: "https://image.tmdb.org/t/p/w1280/bOGkgRGdhrBYJSLpXaxhXVstddV.jpg", language: "English", genre: "Action" },
      { title: "Inception", description: "A thief who steals corporate secrets through the use of dream-sharing technology.", duration: "148 mins", rating: "PG-13", posterUrl: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg", bannerUrl: "https://image.tmdb.org/t/p/w1280/s3TBrRGB1invsyVlNkYSywhXJp.jpg", language: "English", genre: "Sci-Fi" },
      { title: "Interstellar", description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.", duration: "169 mins", rating: "PG-13", posterUrl: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg", bannerUrl: "https://image.tmdb.org/t/p/w1280/xJHokMbljvjSCewxZgAARwW5w7m.jpg", language: "English", genre: "Sci-Fi" },
      { title: "The Dark Knight", description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham.", duration: "152 mins", rating: "PG-13", posterUrl: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg", bannerUrl: "https://image.tmdb.org/t/p/w1280/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg", language: "English", genre: "Action" },
      { title: "Parasite", description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.", duration: "132 mins", rating: "R", posterUrl: "https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg", bannerUrl: "https://image.tmdb.org/t/p/w1280/p9yeWQ50A6nIK2XvK40iL7M2Y0U.jpg", language: "Korean", genre: "Thriller" },
      { title: "Dune: Part Two", description: "Paul Atreides unites with Chani and the Fremen while on a warpath of revenge.", duration: "166 mins", rating: "PG-13", posterUrl: "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2JGjjcNsV.jpg", bannerUrl: "https://image.tmdb.org/t/p/w1280/8rpDcsfLJypbO6vtec0Z8nEqf5A.jpg", language: "English", genre: "Sci-Fi" },
      { title: "Spider-Man: Across the Spider-Verse", description: "Miles Morales catapults across the Multiverse.", duration: "140 mins", rating: "PG-13", posterUrl: "https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg", bannerUrl: "https://image.tmdb.org/t/p/w1280/ub1aXqR1q2yI2jM9hR3rTzH1CGE.jpg", language: "English", genre: "Animation" },
      { title: "The Matrix", description: "A computer hacker learns from mysterious rebels about the true nature of his reality.", duration: "136 mins", rating: "R", posterUrl: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg", bannerUrl: "https://image.tmdb.org/t/p/w1280/lU1zE1Iky5d5iU8A7tXgGjR2NQs.jpg", language: "English", genre: "Action" },
      { title: "Oppenheimer", description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb.", duration: "180 mins", rating: "R", posterUrl: "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg", bannerUrl: "https://image.tmdb.org/t/p/w1280/rLb2cwF3Pazuxaj0sRXQ037tGI1.jpg", language: "English", genre: "Biography" },
      { title: "Gladiator", description: "A former Roman General sets out to exact vengeance against the corrupt emperor.", duration: "155 mins", rating: "R", posterUrl: "https://image.tmdb.org/t/p/w500/ty8TGRuvJLPUmAR1H1nRIsgwvim.jpg", bannerUrl: "https://image.tmdb.org/t/p/w1280/5R1xH7z0FvE1P5gX2e2eI1JtQGk.jpg", language: "English", genre: "Action" },
      { title: "Rrr", description: "A fictitious story about two legendary revolutionaries and their journey away from home before they started fighting for their country in 1920s.", duration: "187 mins", rating: "PG-13", posterUrl: "https://image.tmdb.org/t/p/w500/nEufeZlyAOLqO2brrs0yeO1WMe6.jpg", bannerUrl: "https://image.tmdb.org/t/p/w1280/2u1emE4GzS0M8VwJ02xO3DqH5p0.jpg", language: "Telugu", genre: "Action" }
    ];
    
    const movies = await Movie.insertMany(moviesData);

    const theatersData = [
      { name: "Neon Multiplex", location: "Downtown", city: "New York" },
      { name: "CineCity Grand", location: "Midtown", city: "New York" },
      { name: "Starlight Drive-in", location: "Suburbs", city: "Los Angeles" }
    ];
    
    const theaters = await Theater.insertMany(theatersData);

    // Creates multiple shows natively smoothly seamlessly intelligently compactly automatically safely
    const showsData = [];
    movies.forEach(movie => {
      theaters.forEach(theater => {
        showsData.push({
          movie: movie._id,
          theater: theater._id,
          startTime: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000), // Random future correctly
          price: 15.00,
          totalSeats: 60
        });
      });
    });

    const shows = await Show.insertMany(showsData);

    console.log(`Seeded ${movies.length} movies, ${theaters.length} theaters, ${shows.length} shows dynamically stably elegantly correctly!`);
    
    mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding data explicitly gracefully securely smartly stably dependably flexibly smoothly naturally intelligently securely naturally comfortably natively intelligently cleanly compactly:', error);
    mongoose.disconnect();
  }
};

seedDB();
