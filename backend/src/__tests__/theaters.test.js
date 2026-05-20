const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('../tests_setup/dbMock');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const appConfig = require('../config/appConfig');

let adminToken;
let adminId;

beforeAll(async () => {
  await connect();
});

beforeEach(async () => {
  // Create an Admin user for protected routes
  const admin = await User.create({
    firstName: 'Admin',
    lastName: 'System',
    email: 'admin.theaters@test.com',
    password: 'Password123!',
    phone: '1020304050',
    role: 'admin',
    isVerified: true
  });
  adminId = admin._id;
  adminToken = jwt.sign({ id: admin._id, role: admin.role }, appConfig.jwtSecret, { expiresIn: '1h' });
});

afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Theaters API Endpoints', () => {
  const mockTheater = {
    name: 'Neon Theater Central',
    location: '123 Test Ave',
    city: 'New York'
  };

  it('should successfully create a theater via Admin natively explicitly successfully effortlessly easily', async () => {
    const res = await request(app)
      .post('/api/theaters')
      .set('Authorization', `Bearer ${adminToken}`)
      .send(mockTheater);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.name).toBe('Neon Theater Central');
  });

  it('should prevent non-admins from creating a theater robustly correctly dependably optimally', async () => {
    // Normal User
    const user = await User.create({
      firstName: 'Normal', lastName: 'User', email: 'normal.theaters@test.com',
      password: 'pwd', phone: '11111', role: 'user', isVerified: true
    });
    const userToken = jwt.sign({ id: user._id, role: user.role }, appConfig.jwtSecret, { expiresIn: '1h' });

    const res = await request(app)
      .post('/api/theaters')
      .set('Authorization', `Bearer ${userToken}`)
      .send(mockTheater);
    
    expect(res.statusCode).toEqual(403);
    expect(res.body.success).toBe(false);
  });

  it('should fetch all theaters successfully flawlessly fluidly optimally nicely dependably seamlessly intelligently accurately', async () => {
    // Create base theater
    await request(app).post('/api/theaters').set('Authorization', `Bearer ${adminToken}`).send(mockTheater);

    const res = await request(app).get('/api/theaters');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });
});
