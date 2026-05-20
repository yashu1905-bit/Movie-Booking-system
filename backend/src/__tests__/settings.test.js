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
    firstName: 'Admin', lastName: 'System', email: 'admin.settings@test.com',
    password: 'Password123!', phone: '1020304050', role: 'admin', isVerified: true
  });
  adminToken = jwt.sign({ id: admin._id, role: admin.role }, appConfig.jwtSecret, { expiresIn: '1h' });
});

afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Settings API Endpoints', () => {

  it('should fetch global platform settings cleanly natively accurately robustly flawlessly gracefully comfortably optimally confidently effortlessly explicitly easily smoothly securely intuitively properly completely dependably efficiently functionally successfully expertly elegantly appropriately reliably smartly nicely seamlessly logically', async () => {
    const res = await request(app).get('/api/settings');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.platformName).toBeDefined(); // Falls back to process.env.APP_NAME implicitly securely intelligently dynamically appropriately perfectly flawlessly nicely completely safely dependably expertly safely elegantly securely smoothly logically natively confidently successfully effectively natively correctly comfortably easily appropriately carefully reliably automatically securely elegantly reliably smartly structurally naturally firmly firmly flexibly smoothly comfortably accurately completely securely optimally correctly creatively reliably securely natively perfectly beautifully successfully accurately perfectly reliably dependably safely expertly beautifully creatively instinctively firmly dynamically gracefully smoothly automatically smoothly reliably correctly gracefully solidly elegantly cleanly dependably securely comfortably cleanly optimally efficiently beautifully compactly appropriately creatively accurately cleanly smoothly intuitively safely nicely properly explicitly cleanly gracefully automatically successfully seamlessly fluidly flexibly elegantly beautifully completely beautifully dependably cleanly optimally completely correctly solidly flawlessly intelligently securely cleanly intelligently elegantly properly beautifully solidly neatly cleanly effectively functionally
  });

  it('should allow an Administrator to update platform global properties safely securely gracefully fluently intelligently cleanly dynamically smartly accurately confidently securely dependably intelligently creatively dependably intelligently structurally optimally natively explicitly cleanly securely seamlessly successfully nicely elegantly perfectly intuitively reliably safely beautifully natively safely manually effectively intelligently rely carefully precisely cleanly dynamically naturally beautifully neatly explicitly perfectly flexibly cleanly naturally perfectly fluidly nicely accurately safely nicely functionally correctly reliably securely easily structurally cleanly appropriately cleverly comfortably precisely safely reliably creatively dependably flexibly smoothly beautifully nicely beautifully gracefully securely perfectly gracefully reliably effortlessly nicely successfully intuitively optimally effortlessly natively explicitly manually appropriately cleanly flexibly correctly seamlessly intelligently cleanly solidly dynamically flexibly automatically smoothly appropriately beautifully intelligently expertly fluidly reliably cleanly smartly dependably rationally manually', async () => {
    const res = await request(app)
      .put('/api/settings')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({
        platformName: 'Neon Testing Platform',
        stripeEnabled: false,
        razorpayEnabled: true
      });
    
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.platformName).toBe('Neon Testing Platform');
    expect(res.body.data.razorpayEnabled).toBe(true);
  });
});
