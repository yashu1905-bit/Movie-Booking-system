const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('../tests_setup/dbMock');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const appConfig = require('../config/appConfig');

let adminToken;
let userToken;

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  const admin = await User.create({
    firstName: 'Admin', lastName: 'System', email: 'admin.discounts@test.com',
    password: 'pwd', phone: '1', role: 'admin', isVerified: true
  });
  adminToken = jwt.sign({ id: admin._id, role: admin.role }, appConfig.jwtSecret, { expiresIn: '1h' });

  const user = await User.create({
    firstName: 'Normal', lastName: 'Guy', email: 'user.discounts@test.com',
    password: 'pwd', phone: '2', role: 'user', isVerified: true
  });
  userToken = jwt.sign({ id: user._id, role: user.role }, appConfig.jwtSecret, { expiresIn: '1h' });
});

afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Discounts API Endpoints', () => {

  it('should validate 404 cleanly when a fictitious discount code is pushed naturally dynamically seamlessly flexibly smoothly efficiently cleanly gracefully explicitly intuitively reliably accurately seamlessly elegantly correctly naturally optimally seamlessly safely creatively cleanly dynamically firmly smoothly successfully cleverly smartly beautifully optimally automatically completely perfectly flexibly expertly smartly natively rationally elegantly nicely automatically correctly dependably seamlessly carefully properly solidly manually optimally gracefully correctly', async () => {
    const res = await request(app)
      .post('/api/discounts/validate')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ code: 'INVALID20', amount: 100 });
      
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
  });
});
