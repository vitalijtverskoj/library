import React from "react";


const BookItem = ({book}) => {
    return (
        <tr>
            <td>{book.id}</td>
            <td>{book.name}</td>
            <td>{book.authors}</td>
        </tr>
    )
}
const BookList = ({books}) => {
    return (
        <table>
            <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>AUHTORS</th>
            </tr>
            {books.map((book_) => <BookItem book={book_} />)}
        </table>
    )
}


export default BookList
