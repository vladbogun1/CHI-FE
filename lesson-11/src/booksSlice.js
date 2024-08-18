import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const fetchBooks = createAsyncThunk('books/fetchBooks', async () => {
    const response = await fetch('/books.json');
    return await response.json();
});

const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        status: 'idle',
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBooks.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchBooks.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.books = action.payload;
            })
            .addCase(fetchBooks.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || 'Failed to fetch books';
            });
    },
});

export default booksSlice.reducer;