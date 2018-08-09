import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Book from './Book';
import ErrorBoundary from './ErrorBoundary';
import * as BooksAPI from '../BooksAPI';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.searchBooks = this.searchBooks.bind(this);
    this.state = {
      filteredBooks: [],
    };
  }

  searchBooks(inputValue) {
    BooksAPI.search(inputValue).then(response => {
      this.setState({ filteredBooks: response });
      console.log(this.state.filteredBooks);
    });
  }

  render() {
    const { changeShelf } = this.props;
    const { filteredBooks } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to={`${process.env.PUBLIC_URL}/`} className="close-search">
            Close
          </Link>

          <div className="search-books-input-wrapper">
            {}
            <input
              onChange={e => this.searchBooks(e.target.value)}
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
                    {console.log(b)}
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
};

export default SearchBar;
