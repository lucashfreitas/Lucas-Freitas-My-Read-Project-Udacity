import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import BookShelf from "./Components/BookShelf";
import SearchBar from "./Components/SearchBar";

class BooksApp extends React.Component {
  state = {
    showSearchPage: false,
    books: []
  };

  componentDidMount() {
    this.getBooks();
  }

  getBooks() {
    BooksAPI.getAll().then(b => {
      this.setState({
        books: b
      });
    });
  }

  render() {
    const { books } = this.state;
    const wantToRead = books.filter(book => book.shelf === "wantToRead");
    const currentlyReading = books.filter(
      book => book.shelf === "currentlyReading"
    );

    const read = books.filter(book => book.shelf === "read");

    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <SearchBar />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <BookShelf
                shelfTitle="Currently Reading"
                books={currentlyReading}
              />
              <BookShelf shelfTitle="Want to Read" books={wantToRead} />
              <BookShelf shelfTitle="Read" books={read} />
              <div />
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>
                Add a book
              </a>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default BooksApp;
