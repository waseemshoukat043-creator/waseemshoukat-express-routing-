const express = require('express');

const app = express();
const PORT = 3000;

// JSON data receive/read karne ke liye
app.use(express.json());

// Temporary Book Store data
let books = [
    {
        id: 1,
        title: 'The Alchemist',
        author: 'Paulo Coelho',
        price: 1200
    },
    {
        id: 2,
        title: 'Atomic Habits',
        author: 'James Clear',
        price: 1800
    }
];


// ========================================
// HOME ROUTE
// ========================================

app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Book Store API'
    });
});


// ========================================
// GET ALL BOOKS
// READ
// ========================================

app.get('/api/books', (req, res) => {
    res.json(books);
});


// ========================================
// GET ONE BOOK
// READ
// ========================================

app.get('/api/books/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    res.json(book);
});


// ========================================
// CREATE NEW BOOK
// CREATE
// ========================================

app.post('/api/books', (req, res) => {

    const { title, author, price } = req.body;

    // Validation
    if (!title || !author || !price) {
        return res.status(400).json({
            message: 'Title, author and price are required'
        });
    }

    const newBook = {
        id: books.length > 0
            ? books[books.length - 1].id + 1
            : 1,

        title: title,
        author: author,
        price: price
    };

    books.push(newBook);

    res.status(201).json({
        message: 'Book created successfully',
        book: newBook
    });
});


// ========================================
// UPDATE BOOK
// UPDATE
// ========================================

app.put('/api/books/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const book = books.find(book => book.id === id);

    if (!book) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    const { title, author, price } = req.body;

    // Update only provided fields
    if (title !== undefined) {
        book.title = title;
    }

    if (author !== undefined) {
        book.author = author;
    }

    if (price !== undefined) {
        book.price = price;
    }

    res.json({
        message: 'Book updated successfully',
        book: book
    });
});


// ========================================
// DELETE BOOK
// DELETE
// ========================================

app.delete('/api/books/:id', (req, res) => {

    const id = parseInt(req.params.id);

    const bookIndex = books.findIndex(book => book.id === id);

    if (bookIndex === -1) {
        return res.status(404).json({
            message: 'Book not found'
        });
    }

    const deletedBook = books.splice(bookIndex, 1);

    res.json({
        message: 'Book deleted successfully',
        book: deletedBook[0]
    });
});


// ========================================
// SERVER START
// ========================================

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});