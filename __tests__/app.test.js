const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('anyapiproject1 routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it ('creates a book', async () => {
    const expected = {
      title:'War is a Racket',
      author:'Smedly Butler',
      pages:'120'
      
    };
    const res = await (await request(app).post('api/v1/books')).setEncoding(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of books', async () => {
    const expected = await Book.findAll();
    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual(expected);
  });
});
