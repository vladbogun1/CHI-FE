import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const BookList = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortKey, setSortKey] = useState('name');
    const [currentPage, setCurrentPage] = useState(1);
    const [genre, setGenre] = useState('All');
    const booksPerPage = 6;

    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/books.json')
            .then(response => response.json())
            .then(data => setBooks(data));
    }, []);

    useEffect(() => {
        const query = new URLSearchParams(location.search);
        const page = parseInt(query.get('page')) || 1;
        const genre = query.get('genre') || 'All';
        setCurrentPage(page);
        setGenre(genre);
    }, [location.search]);

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSort = (event) => {
        setSortKey(event.target.value);
    };

    const handlePageChange = (pageNumber) => {
        const query = new URLSearchParams(location.search);
        query.set('page', pageNumber);
        navigate(`?${query.toString()}`);
    };

    const handleGenreChange = (event) => {
        const newGenre = event.target.value;
        const query = new URLSearchParams(location.search);
        query.set('genre', newGenre);
        query.set('page', 1); // reset to first page when changing genre
        navigate(`?${query.toString()}`);
    };

    const filteredBooks = books
        .filter(book => book.name.toLowerCase().includes(searchTerm.toLowerCase()))
        .filter(book => genre === 'All' || book.genre === genre)
        .sort((a, b) => {
            if (sortKey === 'name') {
                return a.name.localeCompare(b.name);
            } else if (sortKey === 'author') {
                return a.author.localeCompare(b.author);
            } else if (sortKey === 'rating') {
                return b.rating - a.rating;
            }
            return 0;
        });

    const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
    const displayedBooks = filteredBooks.slice((currentPage - 1) * booksPerPage, currentPage * booksPerPage);

    const genres = [...new Set(books.map(book => book.genre))];

    return (
        <div className="app-container">
            <div className="header">
                <h1>Book List</h1>
                <div className="controls">
                    <input
                        type="text"
                        placeholder="Search books..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="search-bar"
                    />
                    <select value={sortKey} onChange={handleSort} className="sort-dropdown">
                        <option value="name">Sort by Name</option>
                        <option value="author">Sort by Author</option>
                        <option value="rating">Sort by Rating</option>
                    </select>
                    <select value={genre} onChange={handleGenreChange} className="genre-dropdown">
                        <option value="All">All Genres</option>
                        {genres.map(genre => (
                            <option key={genre} value={genre}>{genre}</option>
                        ))}
                    </select>
                </div>
            </div>
            <ul className="task-list">
                {displayedBooks.map(book => (
                    <Link to={`/book/${book.id}`}>
                        <li key={book.id} className="task-item">
                            <div className="book-list-item">
                                <img src={book.image} alt={book.name} className="book-list-image" />
                                <div>
                                    <h2>{book.name}</h2>
                                    <p>{book.author}</p>
                                    <p>{book.rating} stars</p>
                                    <p>{book.genre}</p>
                                </div>
                            </div>
                        </li>
                    </Link>
                ))}
            </ul>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`page-button ${currentPage === index + 1 ? 'active' : ''}`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default BookList;
