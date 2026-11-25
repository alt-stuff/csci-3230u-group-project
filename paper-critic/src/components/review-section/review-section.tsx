import { useEffect, useState } from "react";
import Review from "../review/review";
import { ReviewEntry } from "../../concept/review-entry";
import useReviews from "../../useReviews";
import ReviewForm from "../review-form/review-form";

export default function ReviewSection({ isbn }: { isbn: string }) {
  const [reviewResult, setReviewResult] = useState<{
    isbn: string;
    reviews: ReviewEntry[] | Error;
  } | null>(null);

  const { reviews: savedReviews, addReview, deleteReview } = useReviews(isbn);

  useEffect(() => {
    const controller = new AbortController();

    async function loadReviews() {
      try {
        const response = await fetch(`/api/reviews/${encodeURIComponent(isbn)}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error(response.status === 404 ? "Book not found." : "Unable to load reviews.");
        }

        const data: unknown = await response.json();
        if (!Array.isArray(data)) {
          throw new TypeError("Review response must be an array.");
        }

        setReviewResult({
          isbn,
          reviews: data.map((review) => ReviewEntry.fromJSON(review)),
        });
      } catch (error) {
        if (controller.signal.aborted) return;
        setReviewResult({
          isbn,
          reviews: error instanceof Error ? error : new Error("Unable to load reviews."),
        });
      }
    }

    void loadReviews();
    return () => controller.abort();
  }, [isbn]);

  const reviews = reviewResult?.isbn === isbn ? reviewResult.reviews : null;

  if (reviews === null) {
    return <p>Loading reviews...</p>;
  }

  if (reviews instanceof Error) {
    return <p role="alert">{reviews.message}</p>;
  }

  return (
    <>
      {reviews.map((review, index) => (
        <Review key={`${review.author}-${index}`} review={review}>
          <p>{review.content}</p>
        </Review>
      ))}

      {savedReviews.map((review, index) => (
        <Review key={`saved-${index}`} review={review}>
          <p>{review.content}</p>
          <button
            type="button"
            aria-label={`Delete review by ${review.author}`}
            onClick={() => deleteReview(index)}
          >
            Delete
          </button>
        </Review>
      ))}

      <ReviewForm onAdd={addReview} />
    </>
  );
}
