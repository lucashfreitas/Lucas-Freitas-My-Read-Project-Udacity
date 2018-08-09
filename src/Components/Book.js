import React from 'react';
import PropTypes from 'prop-types';

const Book = props => {
  const { book, changeShelf } = props;
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 193,
            backgroundImage: `url(${
              book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : 'noImage'
            })`,
          }}
        />
        <div className="book-shelf-changer">
          <select
            onChange={event =>
              book.shelf !== event.target.value && changeShelf(book, event.target.value)
            }
            value={book.shelf}
          >
            <option disabled>Move to...</option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{book.title}</div>
      <div className="book-authors">{book.authors}</div>
    </div>
  );
};

/* Define propTypes */
Book.propTypes = {
  book: PropTypes.object.isRequired,
  changeShelf: PropTypes.func.isRequired,
};

export default Book;
