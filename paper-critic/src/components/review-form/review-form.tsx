// AI-assisted (FormEvent type, .trim() check) - see AI-USAGE.md #2
import { useState } from "react";
import type { FormEvent } from "react";
import type { ReviewEntry } from "../../concept/review-entry";

interface ReviewFormProps {
    onAdd: (review: ReviewEntry) => void;
}

export default function ReviewForm({ onAdd }: ReviewFormProps) {
    const [author, setAuthor] = useState("");
    const [rating, setRating] = useState("5");
    const [content, setContent] = useState("");

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!author.trim() || !content.trim()) {
            return;
        }

        onAdd({
            author,
            rating: Number(rating),
            content
        });

        setAuthor("");
        setContent("");
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="review-author">Your name</label>
            <input
                id="review-author"
                type="text"
                value={author}
                onChange={(event) => setAuthor(event.target.value)}
            />

            <label htmlFor="review-rating">Rating</label>
            <select
                id="review-rating"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
            >
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
            </select>

            <label htmlFor="review-content">Your review</label>
            <textarea
                id="review-content"
                value={content}
                onChange={(event) => setContent(event.target.value)}
            />

            <button type="submit">Post review</button>
        </form>
    );
}

