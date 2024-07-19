import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, CardMedia, Button, Grid } from '@mui/material';

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

    if (!book) return <Typography variant="h6" align="center">Loading...</Typography>;

    return (
        <Container>
            <Card>
                <CardMedia
                    component="img"
                    height="300"
                    image={book.image}
                    alt={book.name}
                />
                <CardContent>
                    <Typography variant="h4" component="div" gutterBottom>
                        {book.name}
                    </Typography>
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                        {book.author}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        <strong>Genre:</strong> {book.genre}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                        <strong>Rating:</strong> {book.rating} stars
                    </Typography>
                    <Typography variant="body1" paragraph>
                        {book.description}
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item>
                            <Button variant="contained" color="primary" onClick={() => navigate(-1)}>
                                Back
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </Container>
    );
};

export default BookDetail;
