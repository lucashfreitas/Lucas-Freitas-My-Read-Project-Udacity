import '../App.css';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf';

const BookShelfList = props => {
  const { changeShelf, books } = props;
  const wantToRead = books.filter(book => book.shelf === 'wantToRead');
  const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
  const read = books.filter(book => book.shelf === 'read');

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <BookShelf
          changeShelf={changeShelf}
          shelfTitle="Currently Reading"
          books={currentlyReading}
        />
        <BookShelf changeShelf={changeShelf} shelfTitle="Want to Read" books={wantToRead} />
        <BookShelf changeShelf={changeShelf} shelfTitle="Read" books={read} />
        <div />
      </div>
      <div className="open-search">
        <Link to={`${process.env.PUBLIC_URL}/search`} />
      </div>
    </div>
  );
};

BookShelfList.propTypes = {
  books: PropTypes.arrayOf(PropTypes.object).isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default BookShelfList;
