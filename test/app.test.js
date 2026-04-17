import test from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';
import { app } from '../src/app.js';

test('GET /health should return service status', async () => {
  const response = await request(app).get('/health');

  assert.equal(response.status, 200);
  assert.equal(response.body.success, true);
  assert.ok(response.body.service);
});

test('GET /v1/states should require API key', async () => {
  const response = await request(app).get('/v1/states');

  assert.equal(response.status, 401);
  assert.equal(response.body.error.code, 'INVALID_API_KEY');
});
