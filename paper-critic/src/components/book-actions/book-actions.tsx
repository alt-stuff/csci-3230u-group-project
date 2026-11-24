import {Fragment} from "react";
import styles from "./book-actions.module.css";

interface BookActionsProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isCurrentlyReading: boolean;
  onToggleCurrentlyReading: () => void;
  isCompleted: boolean;
  onToggleCompleted: () => void;
  isWantToRead: boolean;
  onToggleWantToRead: () => void;
}

export default function BookActions({isFavorite, onToggleFavorite, isCurrentlyReading, onToggleCurrentlyReading, isCompleted, onToggleCompleted, isWantToRead, onToggleWantToRead}: BookActionsProps) {
  return (
    <div className={styles["book-actions"]}>
      <fieldset className={styles["star-rating"]}>
        <legend>Rate this book</legend>
        {[5, 4, 3, 2, 1].map((rating) => (
          <Fragment key={rating}>
            <input
              id={`rating-${rating}`}
              name="rating"
              type="radio"
              value={rating}
              aria-label={`${rating} stars`}
            />
            <label htmlFor={`rating-${rating}`} title={`${rating} stars`}>
              ★
            </label>
          </Fragment>
        ))}
      </fieldset>
      <button
        className={`${styles["favorite-button"]} ${
          isFavorite ? styles["is-favorite"] : ""
        }`}
        type="button"
        aria-pressed={isFavorite}
        onClick={onToggleFavorite}
      >
        <span aria-hidden="true">{isFavorite ? "♥" : "♡"}</span>
        {isFavorite ? "Saved to Favorites" : "Add to Favorites"}
      </button>
      <button
        className={`${styles["favorite-button"]} ${
          isCurrentlyReading ? styles["is-favorite"] : ""
        }`}
        type="button"
        aria-pressed={isCurrentlyReading}
        onClick={onToggleCurrentlyReading}
      >
        {isCurrentlyReading ? "Currently Reading" : "Mark as Currently Reading"}
      </button>
      <button
        className={`${styles["favorite-button"]} ${
          isCompleted ? styles["is-favorite"] : ""
        }`}
        type="button"
        aria-pressed={isCompleted}
        onClick={onToggleCompleted}
      >
        {isCompleted ? "Completed" : "Mark as Completed"}
      </button>
      <button
        className={`${styles["favorite-button"]} ${
          isWantToRead ? styles["is-favorite"] : ""
        }`}
        type="button"
        aria-pressed={isWantToRead}
        onClick={onToggleWantToRead}
      >
        {isWantToRead ? "Saved to Want to Read" : "Want to Read"}
      </button>
    </div>
  );
}
