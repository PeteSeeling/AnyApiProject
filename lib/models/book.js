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
  

  }

  getTestBook() {
    return `this is a book named ${this.title} wirtten by ${this.author}`;
  
  }

  static async insert({ title, author, pages }) {
    const { rows } = await pool.query(

      `
      INSERT INTO 
       books (title, author, pages)
       VALUES
       ($1, $2, $3)
       RETURNING
        *
       `,
      [title, author, pages]
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
  static async findBookById(id){
    const { rows } = await pool.query(
      `
    SELECT
    *
    FROM
      books
    WHERE
      id=$1
    `,
      [id]
    );
    return new Book(rows[0]);
  }

  static async updateBookById(id, attributes) {
    const existingBook = await Book.findBookById(id);
    const updatedAttributes = { ...existingBook, ...attributes };
    const { title, author, pages } = updatedAttributes;
    const { rows } = await pool.query(
      `
      UPDATE
        books
      SET
        title=$1,
        author=$2,
        pages=$3
      WHERE
        id=$4
      RETURNING
       *
        `,
      [title, author, pages, id]
    );
    return new Book(rows[0]);
  }
  static async deleteBookById(id) {
    console.log(id);
    const { rows } = await pool.query(
      `
      DELETE FROM
        books
      WHERE
        id=$1
      RETURNING
        *`,
      [id]
    );
    return new Book(rows[0]);
  }

};
