const request = require('supertest');
const app = require("../app");

describe('Login API', () => {
  it('major: should return 200 and a token for valid credentials', async () => {  // Major test case
    const res = await request(app)
      .post('/login')
      .send({ userId: 'testuser', password: 'password123' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('major: should return 401 for invalid credentials', async () => {  // Major test case
    const res = await request(app)
      .post('/login')
      .send({ userId: 'wronguser', password: 'wrongpass' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});

describe('Logout API', () => {
  it('minor: should return 200 for valid token', async () => {  // Minor test case
    const res = await request(app)
      .post('/logout')
      .send({ token: 'abc121' });

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Logout successful');
  });

  it('minor: should return 401 for invalid token', async () => {  // Minor test case
    const res = await request(app)
      .post('/logout')
      .send({ token: 'wrongtoken' });

    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid token');
  });
});
