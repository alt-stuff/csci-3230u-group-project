import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {search, getDescription} from "./open-api.js"

var bookAPI = express.Router();

import reviewData from './reviewMockData.json' with { type: 'json' };

const reviewsByIsbn: Record<string, { rating: number; name: string; content: string }[]> = reviewData;

bookAPI.get('/recommended', async (req, res) => {
    // res.send(data.slice(0, 3))
    try{
        const books = await search("subject:fantasy");
        res.json(books.slice(0, 3));
    } catch (error){
        console.error(error);
        res.status(500).json({
            error: "Failed to load recommended books"
        })
    }
});

bookAPI.get('/search', async (req, res) => {
    const query = req.query.q;

    if (typeof query !== "string" || !query.trim()) {
        res.status(400).json({
            error: "Search query is required"
        });
        return;
    }

    try {
        const books = await search(query);
        res.json(books);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve books"
        });
    }
});

bookAPI.get('/handpicked', async (req, res) => {
    // res.send(data.slice(3, 6))
    try{
        const books = await search("subject:romance");
        res.json(books.slice(0, 3));
    } catch (error){
        console.error(error);
        res.status(500).json({
            error: "Failed to load recommended books"
        })
    }
});

bookAPI.get('/similar', async (req, res) => {
    // res.send(data.slice(2, 6))
    const isbn = req.query.isbn;

    if(typeof isbn !== "string"){
        res.status(400).json({error: "ISBN is required"});
        return;
    }
    try{
        const books = await search("isbn:"+ isbn);
        const book = books[0];

        if(!book){
            res.json([]);
            return;
        }
        
        const genre = book.genres[0] ?? "fiction";
        const similar = await search("subject:"+ genre);
        res.json(similar.filter((b:any) => b.isbn !== isbn && b.key !== book.key).slice(0,4));
    }catch(error){
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve similar books"
        });
    }
});

bookAPI.get('/reviews/:isbn', (req, res) => {
    const reviews = reviewsByIsbn[req.params.isbn] ?? [];

    res.json(reviews.map(({ rating, name, content }) => ({
        rating,
        author: name,
        content,
    })));
});


bookAPI.get('/isbn/:id', async (req, res) => {
    try {
        const isbn = req.params.id;
        const books = await search("isbn:" + isbn);

    
        // const book = data.find((book) => book.isbn === req.params.id);
        if (books.length === 0) {
            res.status(404).json({ error: 'Book not found' });
            return;
        }
        const description = await getDescription(books[0].key).catch(() => "");
        res.json({...books[0], isbn: isbn, description: description});

    } catch (error){
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve book"
        });
    }
});


const coverDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../covers');
bookAPI.use('/covers', express.static(coverDirectory));
// bookAPI.use(express.static("../cosvers"))

export { bookAPI };