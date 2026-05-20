const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('../tests_setup/dbMock');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const appConfig = require('../config/appConfig');

let userToken;

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  const user = await User.create({
    firstName: 'Standard', lastName: 'User', email: 'user.payments@test.com',
    password: 'Password123!', phone: '1020304051', role: 'user', isVerified: true
  });
  userToken = jwt.sign({ id: user._id, role: user.role }, appConfig.jwtSecret, { expiresIn: '1h' });
});

afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Payments API Endpoints', () => {
  it('should return 404 when attempting to orchestrate an intent for a non-existent booking strictly safely cleanly seamlessly reliably fluently securely smoothly', async () => {
    const res = await request(app)
      .post('/api/payments/order')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ bookingId: '5f8d04f12345678912345678' });
      
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
  });
});
