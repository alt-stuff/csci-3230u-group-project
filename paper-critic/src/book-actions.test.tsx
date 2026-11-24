import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { afterEach, expect, test } from "vitest";
import BookActions from "./components/book-actions/book-actions";
import useFavorites from "./useFavorites";
import useCurrentlyReading from "./useCurrentlyReading";
import useCompleted from "./useCompleted";
import useWantToRead from "./useWantToRead";

function BookActionsForTest() {
  const isbn = "9780142410349";
  const { favorites, toggleFavorite } = useFavorites();
  const { currentlyReading, toggleCurrentlyReading } = useCurrentlyReading();
  const { completed, toggleCompleted } = useCompleted();
  const { wantToRead, toggleWantToRead } = useWantToRead();

  return (
    <BookActions
      isFavorite={favorites.includes(isbn)}
      onToggleFavorite={() => toggleFavorite(isbn)}
      isCurrentlyReading={currentlyReading.includes(isbn)}
      onToggleCurrentlyReading={() => toggleCurrentlyReading(isbn)}
      isCompleted={completed.includes(isbn)}
      onToggleCompleted={() => toggleCompleted(isbn)}
      isWantToRead={wantToRead.includes(isbn)}  
      onToggleWantToRead={() => toggleWantToRead(isbn)}
    />
  );
}

afterEach(() => {
  cleanup();
  localStorage.clear();
});

test("clicking Add to Favorites saves the book to Favorites", async () => {
  // Arrange
  const user = userEvent.setup();
  render(<BookActionsForTest />);

  // Act
  await user.click(screen.getByRole("button", { name: "Add to Favorites" }));

  // Assert
  expect(screen.getByRole("button", { name: "Saved to Favorites" })).toBeTruthy();
});

test("clicking Mark as Currently Reading changes the button label", async () => {
  const user = userEvent.setup();
  render(<BookActionsForTest />);

  await user.click(
    screen.getByRole("button", { name: "Mark as Currently Reading" })
  );

  expect(screen.getByRole("button", { name: "Currently Reading" })).toBeTruthy();
});

test("clicking Mark as Completed changes the button label", async () => {
  const user = userEvent.setup();
  render(<BookActionsForTest />);

  await user.click(screen.getByRole("button", { name: "Mark as Completed" }));

  expect(screen.getByRole("button", { name: "Completed" })).toBeTruthy();
});

test("clicking Want to Read saves the book to the shelf", async () => {
  const user = userEvent.setup();
  render(<BookActionsForTest />);

  await user.click(screen.getByRole("button", { name: "Want to Read" }));

  expect(
    screen.getByRole("button", { name: "Saved to Want to Read" })
  ).toBeTruthy();
});