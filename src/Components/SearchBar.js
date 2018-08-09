import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';
import ErrorBoundary from './ErrorBoundary';

class SearchBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { changeShelf, searchBooks, filteredBooks } = this.props;

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            {}
            <input
              onChange={e => searchBooks(e.target.value)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          {filteredBooks && filteredBooks.length > 0 ? (
            <ol className="books-grid">
              <ErrorBoundary>
                {filteredBooks.map(b => (
                  <li key={b.id}>
                    <Book changeShelf={changeShelf} book={b} />
                  </li>
                ))}
              </ErrorBoundary>
            </ol>
          ) : (
            <div>Nenhum Livro na estante</div>
          )}
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  changeShelf: PropTypes.func.isRequired,
  filteredBooks: PropTypes.array.isRequired,
  searchBooks: PropTypes.func.isRequired,
};

export default SearchBar;
