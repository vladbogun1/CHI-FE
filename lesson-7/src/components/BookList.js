import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, Grid, TextField, MenuItem, Button, Typography, Card, CardContent, CardMedia } from '@mui/material';

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
        <Container>
            <Typography variant="h4" align="center" gutterBottom>Book List</Typography>
            <Grid container spacing={2} alignItems="center" justifyContent="center" sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        label="Search books..."
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Sort by"
                        value={sortKey}
                        onChange={handleSort}
                    >
                        <MenuItem value="name">Name</MenuItem>
                        <MenuItem value="author">Author</MenuItem>
                        <MenuItem value="rating">Rating</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        select
                        label="Genre"
                        value={genre}
                        onChange={handleGenreChange}
                    >
                        <MenuItem value="All">All Genres</MenuItem>
                        {genres.map(genre => (
                            <MenuItem key={genre} value={genre}>{genre}</MenuItem>
                        ))}
                    </TextField>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                {displayedBooks.map(book => (
                    <Grid item xs={12} sm={6} md={4} key={book.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={book.image}
                                alt={book.name}
                            />
                            <CardContent>
                                <Typography variant="h5" component="div">
                                    {book.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {book.author}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {book.rating} stars
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {book.genre}
                                </Typography>
                                <Link to={`/book/${book.id}`} style={{ textDecoration: 'none' }}>
                                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                                        View Details
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            <Grid container spacing={2} justifyContent="center" sx={{ mt: 3 }}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <Grid item key={index}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => handlePageChange(index + 1)}
                            disabled={currentPage === index + 1}
                        >
                            {index + 1}
                        </Button>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default BookList;
