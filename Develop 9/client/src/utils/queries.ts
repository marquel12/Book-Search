
import {gql} from '@apollo/client';

// get logged in user's info (needs the token)
export const GET_ME = gql`
query me {
    me {
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

// get a single user by their username
export const GET_USER = gql`
query user($username: String!) {
    user(username: $username) {
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

// get all books saved by a single user
export const GET_ME_BOOKS = gql`
query meBooks {
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
`;