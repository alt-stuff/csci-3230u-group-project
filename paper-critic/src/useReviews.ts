
import { useEffect, useState } from "react";
import type { ReviewEntry } from "./concept/review-entry";

export default function useReviews(isbn: string) {
    const storageKey = "reviews-" + isbn;

    const [reviews, setReviews] = useState<ReviewEntry[]>(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    });

    function addReview(review: ReviewEntry) {
        setReviews((previousReviews) => {
            return [...previousReviews, review];
        });
    }

    function deleteReview(index: number) {
        setReviews((previousReviews) => {
            return previousReviews.filter((_review, i) => i !== index);
        });
    }

    useEffect(() => {
        localStorage.setItem(storageKey, JSON.stringify(reviews));
    }, [reviews, storageKey]);

    return { reviews, addReview, deleteReview };
}
