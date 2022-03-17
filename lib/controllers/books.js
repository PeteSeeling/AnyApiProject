const { Router } = require('express');
const Book = require('../models/book');

module.exports = Router()

  .post('/', async (req, res) => {
    const book = await Book.insert(req.body);
    res.send(book);
  })

  .get('/', async (req, res) => {
    const books = await Book.listAllRows();
    res.send(books);
  })

  .get('/:id', async (req, res, next) => {
    try{
      const book = await Book.findBookById(req.params.id);

      res.send(book);

    } catch (error) {
      error.status = 404;
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const book = await Book.updateBookById(req.params.id, req.body);
    res.send(book);
  })

  .delete('/:id', async (req, res) => {
    const book = await Book.deleteBookById(req.params.id);
    res.send(book);
  });

