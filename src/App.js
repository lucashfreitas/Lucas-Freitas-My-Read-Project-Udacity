import React from 'react';
import { Route } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ErrorBoundary from './Components/ErrorBoundary';
import SearchBar from './Components/SearchBar';

import BookShelfList from './Components/BookShelfList';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      filteredBooks: [],
    };
    this.getBooks = this.getBooks.bind(this);
    this.changeShelf = this.changeShelf.bind(this);
    this.searchBooks = this.searchBooks.bind(this);
  }

  componentDidMount() {
    this.setState({ filteredBooks: [] });
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll().then(b => {
      this.setState({
        books: b,
      });
    });
  }

  changeShelf = (book, newShelf) => {
    const { filteredBooks } = this.state;
    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign */
    BooksAPI.update(book, newShelf).then(() => {
      this.getBooks();
      /* //update search books shelf */
      const filteredBook = filteredBooks.find(e => e.id === book.id);
      if (filteredBook) {
        filteredBook.shelf = newShelf;
      }
    });
  };

  searchBooks(inputValue) {
    const { books } = this.state;
    BooksAPI.search(inputValue).then(response => {
      if (response && response.length > 0) {
        response.forEach((item, index) => {
          const findBookShelf = books.find(b => b.id === item.id);
          /* Foreach doesnt not work by reference. */
          response[index].shelf = findBookShelf ? findBookShelf.shelf : 'none';
        });
        this.setState({ filteredBooks: response });
      } else this.setState({ filteredBooks: [] });
    });
  }

  render() {
    const { books, filteredBooks } = this.state;
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');
    const read = books.filter(book => book.shelf === 'read');

    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <ErrorBoundary>
              <SearchBar
                filteredBooks={filteredBooks}
                searchBooks={this.searchBooks}
                changeShelf={this.changeShelf}
              />
            </ErrorBoundary>
          )}
        />

        <Route
          exact
          path="/"
          render={() => <BookShelfList books={this.state.books} changeShelf={this.changeShelf} />}
        />
      </div>
    );
  }
}

export default BooksApp;
