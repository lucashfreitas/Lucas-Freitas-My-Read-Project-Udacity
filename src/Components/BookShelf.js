import '../App.css';
import PropTypes from 'prop-types';
import React from 'react';
import Book from './Book';

const BookShelf = props => {
  const { changeShelf, shelfTitle, books } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        {books && books.length > 0 ? (
          <ol className="books-grid">
            {books.map(b => (
              <li key={b.id}>
                <Book changeShelf={changeShelf} book={b} />
              </li>
            ))}
          </ol>
        ) : (
          <div>Nenhum Livro na estante</div>
        )}
      </div>
    </div>
  );
};

BookShelf.propTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookShelf;
