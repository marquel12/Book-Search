import { Container, Card, Button, Row, Col } from "react-bootstrap";
import Auth from "../utils/auth";
import { removeBookId } from "../utils/localStorage";
import { GET_ME } from "../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_BOOK } from "../utils/mutations";

import { useEffect, useState } from "react";

interface Book {
  bookId: string;
  authors: string[];
  title: string;
  description: string;
  image: string;
}

const SavedBooks = () => {
  const {
    data: userData,
    loading,
    error,
  } = useQuery(GET_ME, {
    skip: !Auth.loggedIn(), // if not logged in, don't send query; this will return undefined and not cause errors
  });
  console.log(userData);

  // create state to hold saved bookId values
  const [savedBooks, setSavedBookIds] = useState<Book[]>([]);

  // set up useEffect hook to save `savedBooks` list to localStorage on component unmount
  useEffect(() => {
    if (userData && userData.me.savedBooks) {
      setSavedBookIds(userData.me.savedBooks); // this is setting the savedBooks state to the user's savedBooks array from the database
    }
  }, [userData]); // use userData to trigger the useEffect re-run when the component mounts

  // Mutation to remove a book
  const [removeBook] = useMutation(REMOVE_BOOK, {
    refetchQueries: [{ query: GET_ME }], // refetch the user's saved books after removing a book
  });

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    try {
      await removeBook({
        variables: { bookId: bookId },
      });
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {savedBooks.length
            ? `Viewing ${savedBooks.length} saved ${
                savedBooks.length === 1 ? "book" : "books" //
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {savedBooks.map((book: Book) => {
            // map over savedBooks
            return (
              <Col md="4">
                <Card key={book.bookId} border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
