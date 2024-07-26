import request from 'supertest';
import app from '../src/app';

describe('App', () => {
  it('should return 200 status', async () => {
    const res = await request(app).get('/ping').send();
    expect(res.statusCode).toBe(200);
  });
});
