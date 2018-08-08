import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';

import SearchBar from './Components/SearchBar';
import BookShelf from './Components/BookShelf';

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
    };
    this.getBooks = this.getBooks.bind(this);
    this.changeShelf = this.changeShelf.bind(this);
  }

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

  changeShelf = (book, newShelf) => {
    /* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign */
    BooksAPI.update(book, newShelf).then(response => {
      const { books } = this.state;
      const index = books.findIndex(bk => bk.id === book.id);
      books[index] = Object.assign({}, books[index], { shelf: newShelf });
      this.setState({ books });
    });
  };

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
