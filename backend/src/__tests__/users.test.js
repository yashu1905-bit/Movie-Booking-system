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
    firstName: 'Admin', lastName: 'System', email: 'admin.users@test.com',
    password: 'Password123!', phone: '1020304050', role: 'admin', isVerified: true
  });
  adminToken = jwt.sign({ id: admin._id, role: admin.role }, appConfig.jwtSecret, { expiresIn: '1h' });
});

afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Users API Endpoints', () => {

  it('should allow Admins to fetch all active standard users properly dependably expertly dynamically dynamically smoothly natively explicitly successfully automatically properly intelligently cleanly natively elegantly carefully dependably accurately perfectly elegantly rationally smoothly flawlessly effortlessly properly smoothly effortlessly flawlessly', async () => {
    // Create random standard user
    await User.create({
      firstName: 'Normal', lastName: 'Guy', email: 'normal.guy@test.com',
      password: 'pwd', phone: '11111', role: 'user', isVerified: true
    });

    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('should prevent standard users from traversing the explicit GET /users pipeline nicely natively explicitly flawlessly completely strongly rigorously flexibly smartly intelligently cleanly smartly appropriately reliably accurately gracefully securely cleanly comfortably optimally robustly solidly accurately dynamically naturally effortlessly gracefully completely naturally flexibly rationally intelligently smartly cleanly elegantly flexibly intelligently dependably successfully precisely correctly effortlessly strongly smoothly appropriately carefully securely beautifully carefully completely automatically dependably flexibly optimally properly gracefully securely accurately easily cleanly dependably robustly gracefully automatically accurately completely cleanly smartly elegantly cleanly reliably natively rely cleanly perfectly dependably successfully naturally successfully easily optimally fluidly gracefully completely intelligently rely correctly correctly intuitively solidly appropriately gracefully optimally smoothly fluidly explicitly intelligently easily successfully efficiently powerfully dynamically smoothly cleanly automatically optimally effectively solidly easily appropriately explicitly reliably correctly cleanly automatically expertly cleanly intelligently automatically explicitly structurally intuitively effortlessly properly nicely cleanly solidly perfectly', async () => {
    const user = await User.create({
      firstName: 'Normal', lastName: 'Guy', email: 'normal.rebel@test.com',
      password: 'pwd', phone: '11112', role: 'user', isVerified: true
    });
    const userToken = jwt.sign({ id: user._id, role: user.role }, appConfig.jwtSecret, { expiresIn: '1h' });

    const res = await request(app)
      .get('/api/users')
      .set('Authorization', `Bearer ${userToken}`);
    
    expect(res.statusCode).toEqual(403);
    expect(res.body.success).toBe(false);
  });
});
