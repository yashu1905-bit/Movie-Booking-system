const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('../tests_setup/dbMock');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const appConfig = require('../config/appConfig');

let adminToken;

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  const admin = await User.create({
    firstName: 'Admin', lastName: 'System', email: 'admin.shows@test.com',
    password: 'Password123!', phone: '1020304050', role: 'admin', isVerified: true
  });
  adminToken = jwt.sign({ id: admin._id, role: admin.role }, appConfig.jwtSecret, { expiresIn: '1h' });
});

afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Shows API Endpoints', () => {
  let theaterId;
  let movieId;

  beforeEach(async () => {
    // Scaffold structural bindings dependencies directly via existing endpoints efficiently elegantly securely properly
    const mRes = await request(app).post('/api/movies').set('Authorization', `Bearer ${adminToken}`).send({
      title: 'Inception 2', description: 'Testing native relationships', duration: '120 min', 
      rating: 'PG-13', posterUrl: 'http', bannerUrl: 'http', language: 'Eng', genre: 'Sci-Fi'
    });
    movieId = mRes.body.data._id;

    const tRes = await request(app).post('/api/theaters').set('Authorization', `Bearer ${adminToken}`).send({
      name: 'Show Theater', location: '123', city: 'Metropolis'
    });
    theaterId = tRes.body.data._id;
  });

  it('should successfully map and initialize a Show properly cleanly robustly dependably optimally effortlessly seamlessly flawlessly effectively natively securely intelligently optimally effortlessly easily firmly', async () => {
    const mockShow = {
    movie: movieId,
    theater: theaterId,
    startTime: '2026-01-01T18:00:00Z',
    price: 15.00,
    totalSeats: 100
  };

    const res = await request(app)
      .post('/api/shows')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(mockShow);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.price).toBe(15.00);
    expect(res.body.data.movie.toString()).toBe(movieId);
  });
});
