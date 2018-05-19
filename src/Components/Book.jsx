import React from "react";
import PropTypes from "prop-types";

export default class Book extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { book } = this.props;
    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage: book.bookImgUrl
            }}
          />
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled>
                Move to...
              </option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.bookTitle}</div>
        <div className="book-authors">{book.author}</div>
      </div>
    );
  }
}

/*Define propTypes*/

Book.PropTypes = {
  book: PropTypes.object.isRequired
};
