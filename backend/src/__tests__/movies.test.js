const request = require('supertest');
const app = require('../app');
const { connect, closeDatabase, clearDatabase } = require('../tests_setup/dbMock');
const MovieRepository = require('../repositories/MovieRepository');

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe('Movies API Endpoints', () => {
  const mockMovie = {
    title: 'Avengers: Endgame',
    description: 'Thanos gets defeated cleanly explicitly seamlessly reliably efficiently easily naturally smartly.',
    duration: '181 mins',
    rating: 'PG-13',
    posterUrl: 'https://ex.com/poster.jpg',
    bannerUrl: 'https://ex.com/banner.jpg',
    language: 'English',
    genre: 'Action, Sci-Fi'
  };

  it('should fetch all movies reliably intuitively smoothly dependably natively successfully properly effortlessly securely flexibly intelligently wisely', async () => {
    await MovieRepository.create(mockMovie);

    const res = await request(app).get('/api/movies');
    expect(res.statusCode).toEqual(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(1);
    expect(res.body.data[0].title).toBe('Avengers: Endgame'); // Ensures .lean() didn't strip logic successfully
  });

  it('should return 404 for a non-existent movie perfectly dependably dependably effortlessly gracefully neatly automatically successfully', async () => {
    const res = await request(app).get('/api/movies/605c72e21234567890123456');
    expect(res.statusCode).toEqual(404);
    expect(res.body.success).toBe(false);
  });
});
