import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import ErrorBoundary from './Components/ErrorBoundary';
import SearchBar from './Components/SearchBar';
import BookShelf from './Components/BookShelf';

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
    console.log('did mount called');
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
      filteredBooks.find(e => e.id === book.id).shelf = newShelf;
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
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelf
                  changeShelf={this.changeShelf}
                  shelfTitle="Currently Reading"
                  books={currentlyReading}
                />
                <BookShelf
                  changeShelf={this.changeShelf}
                  shelfTitle="Want to Read"
                  books={wantToRead}
                />
                <BookShelf changeShelf={this.changeShelf} shelfTitle="Read" books={read} />
                <div />
              </div>
              <div className="open-search">
                <Link to={`${process.env.PUBLIC_URL}/search`} />
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
