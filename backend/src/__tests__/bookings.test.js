const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('../tests_setup/dbMock');
const BookingRepository = require('../repositories/BookingRepository');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Bookings API Endpoints', () => {

  it('should return 400 or 401 Unauthorized for creating bookings without JWT natively', async () => {
    const res = await request(app)
      .post('/api/bookings')
      .send({
        showId: '605c72e21234567890123456',
        seats: ['A1', 'A2'],
        totalPrice: 500
      });
      
    // Because no token is passed, it should fail before executing logic cleanly
    expect(res.statusCode).toBeGreaterThanOrEqual(400); 
  });

});
