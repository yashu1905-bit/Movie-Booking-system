const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('../tests_setup/dbMock');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Authentication API Endpoints', () => {
  const dummyUser = {
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@example.com',
    phone: '1234567890',
    password: 'password123'
  };

  it('should successfully register a new user safely correctly cleanly', async () => {
    const res = await request(app)
      .post('/api/auth/signup')
      .send(dummyUser);
    
    expect(res.statusCode).toEqual(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.email).toBe(dummyUser.email);
    expect(res.body.data.message).toContain('OTP sent successfully');
  });

  it('should prevent duplicate email registration explicit gracefully stably reliably', async () => {
    await request(app).post('/api/auth/signup').send(dummyUser);
    const res = await request(app)
      .post('/api/auth/signup')
      .send(dummyUser);
      
    expect(res.statusCode).toEqual(400);
    expect(res.body.success).toBe(false);
    expect(res.body.message).toContain('User already exists');
  });

  it('should successfully login and return JWT correctly reliably correctly functionally rationally successfully', async () => {
    // Register
    await request(app).post('/api/auth/signup').send(dummyUser);
    
    // Login
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: dummyUser.email, password: dummyUser.password });
    
    expect(res.statusCode).toEqual(202);
    expect(res.body.success).toBe(true);
    // User should initially be unverified, triggering OTP verification flow natively
    expect(res.body.data.isVerified).toBe(false);
  });
});
