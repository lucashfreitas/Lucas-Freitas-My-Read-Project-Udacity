import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

import SearchBar from './Components/SearchBar';
import BookShelf from './Components/BookShelf';

class BooksApp extends React.Component {
  state = {
    books: [],
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll().then(b => {
      this.setState({
        books: b,
      });
    });
  }

  render() {
    const { books } = this.state;
    const wantToRead = books.filter(book => book.shelf === 'wantToRead');
    const currentlyReading = books.filter(book => book.shelf === 'currentlyReading');

    const read = books.filter(book => book.shelf === 'read');

    return (
      <div className="app">
        <Route exact path="/search" render={() => <SearchBar />} />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelf shelfTitle="Currently Reading" books={currentlyReading} />
                <BookShelf shelfTitle="Want to Read" books={wantToRead} />
                <BookShelf shelfTitle="Read" books={read} />
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
