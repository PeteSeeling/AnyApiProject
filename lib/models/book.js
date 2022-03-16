const pool = require('../utils/pool');

module.exports = class Book {
  id;
  title;
  author;
  pages;


  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.author = row.author;
    this.pages = row.pages;
    this.edition = row.edition;

  }

  getTestBook() {
    return `this is a book named ${this.title} wirtten by ${this.author}`;
  }

  static async insert({ title, author, pages, edition }) {
    const { rows } = await pool.query(

      `
      INSERT INTO 
       books (title, auther, pages, edition)
       VALUES
       ($1, $2, $3)
       RETURNING
        *`,
      [title, author, pages, edition]
    );
    return new Book(rows[0]);
  }
  static async listAllRows() {
    const { rows } = await pool.query(
      `
      SELECT
      *
      FROM
      books`
    );
    return rows.map((row) => new Book(row));
  }

};
