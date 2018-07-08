import React from "react";
import "../App.css";
import PropTypes from "prop-types";
import Book from "./Book";

function BookShelf(props) {
  const { shelfTitle, books } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books">
        {books && books.length > 0 ? (
          <ol className="books-grid">
            {books.map(b => {
              return (
                <li key>
                  <Book book={b} />
                </li>
              );
            })}
          </ol>
        ) : (
          <div>"Nenhum Livro na estante"</div>
        )}
      </div>
    </div>
  );
}

BookShelf.PropTypes = {
  shelfTitle: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
};

export default BookShelf;
