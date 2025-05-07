const request = require('supertest');
const app = require("../app");

describe('Login API', () => {
  it('major: should return 200 and a token for valid credentials', async () => {
    // Arrange
    const validCredentials = { userId: 'testuser', password: 'password123' };

    // Act
    const res = await request(app)
      .post('/login')
      .send(validCredentials);

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });

  it('major: should return 401 for invalid credentials', async () => {
    // Arrange
    const invalidCredentials = { userId: 'wronguser', password: 'wrongpass' };

    // Act
    const res = await request(app)
      .post('/login')
      .send(invalidCredentials);

    // Assert
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid credentials');
  });
});

describe('Logout API', () => {
  it('minor: should return 200 for valid token', async () => {
    // Arrange
    const validTokenPayload = { token: 'abc121' };

    // Act
    const res = await request(app)
      .post('/logout')
      .send(validTokenPayload);

    // Assert
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Logout successful');
  });

  it('minor: should return 401 for invalid token', async () => {
    // Arrange
    const invalidTokenPayload = { token: 'wrongtoken' };

    // Act
    const res = await request(app)
      .post('/logout')
      .send(invalidTokenPayload);

    // Assert
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Invalid token');
  });
});
