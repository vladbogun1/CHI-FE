import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const BookDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch('/books.json')
            .then(response => response.json())
            .then(data => {
                const foundBook = data.find(book => book.id === parseInt(id));
                setBook(foundBook);
            });
    }, [id]);

    if (!book) return <div>Loading...</div>;

    return (
        <div className="book-detail-container">
            <div className="header">
                <h1>{book.name}</h1>
            </div>
            <div className="book-content">
                <img src={book.image} alt={book.name} />
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Rating:</strong> {book.rating} stars</p>
                <p><strong>Description:</strong> {book.description}</p>
                <button className="neomorph-button" onClick={() => navigate('/')}>Back</button>
            </div>
        </div>
    );
};

export default BookDetail;
