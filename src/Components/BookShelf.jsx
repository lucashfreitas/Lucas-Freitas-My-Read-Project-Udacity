import React from 'react';
import '../App.css';
import PropTypes from 'prop-types';
import Book from './Book';

const BookShelf = ({ shelfTitle, books }) => (
  <div className="bookshelf">
    <h2 className="bookshelf-title">{shelfTitle}</h2>
    <div className="bookshelf-books">
      {books && books.length > 0 ? (
        <ol className="books-grid">
          {books.map(b => (
            <li key={b.id}>
              <Book book={b} />
            </li>
          ))}
        </ol>
      ) : (
        <div>Nenhum Livro na estante</div>
      )}
    </div>
  </div>
);

BookShelf.propTypes = {
  shelfTitle: PropTypes.arrayOf(PropTypes.object).isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BookShelf;
