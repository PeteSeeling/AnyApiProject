const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Book = require('../lib/models/book');

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
    const expected = await Book.listAllRows();
    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual(expected);
  });

  it('returns 404 for book not found', async () => {
    const res = await request(app).get('/api/v1/books/not-real');

    expect(res.status).toEqual(404);
  });

  it('updates a book by id', async () => {
    const expected = {
      id:expect.any(String),
      title:'War is a Racket',
      author: 'Smedly Butler',
      pages:'122',
    
    };
    const res = await request(app)
      .patch('/api/v1/books/1')
      .send({ pages:'122' });

    expect(res.body).toEqual(expected);
  });
});
