import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation Mutation($input: UserInput!) {
    addUser(input: $input) {
      user {
        username
        _id
      }
      token
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: string!, $password: string!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
        savedBooks {
          authors
          description
          bookId
          image
          link
          title
        }
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($input: BookInput!) {
    saveBook(input: $input) {
      _id
      username
      email
      savedBooks {
        _id
        authors
        description
        bookId
        image
        link
        title
      }
    }
  }
`;

export const REMOVE_BOOK = gql`
mutation removeBook(bookId:String!) {
    removeBook(bookId: $bookId) {
        _id
        username
        email
        savedBooks{
            _id
            authors
            description
            bookId
            image
            link
            title
        }
    }
    }
    `;
