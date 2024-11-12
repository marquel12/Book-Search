import { useState} from 'react';
import { Container, Card, Button, Row, Col } from 'react-bootstrap';


import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';

import { GET_ME } from '../utils/queries';

import { useMutation, useQuery } from '@apollo/client';
import { REMOVE_BOOK } from '../utils/mutations';



const SavedBooks = () => {

  const { data: userData, loading,  error} = useQuery(GET_ME
    
  );



  // Mutation to remove a book
  const [removeBook] = useMutation(REMOVE_BOOK);

  // State to store saved books
  const [savedBooks, setSavedBooks] = useState<
    {
      _id: string;
      title: string;
      authors: string[];
      description: string;
      image?: string;
    }[]
  >([]);

  



  

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId: string) => {
    
    try {
     await removeBook({
        variables: { bookId: bookId }
      });
      Auth.login(userData.token);

      // upon success, remove book's id from localStorage
      removeBookId(bookId);

      // update user data
      setSavedBooks(savedBooks.filter((book) => book._id !== bookId));
    } catch (err) {
      console.error(err);

      }  
    };
      

   
  

 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <>
      <div className='text-light bg-dark p-5'>
        <Container>
          {userData.username ? (
            <h1>Viewing {userData.username}'s saved books!</h1>
          ) : (
            <h1>Viewing saved books!</h1>
          )}
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? 'book' : 'books'
              }:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book:any) => {
            return (
              <Col md='4'>
                <Card key={book.bookId} border='dark'>
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant='top'
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button
                      className='btn-block btn-danger'
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
