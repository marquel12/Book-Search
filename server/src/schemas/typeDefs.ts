import { gql } from "graphql-tag";

const typeDefs = gql`

type User {
    _id: ID!
    username: String
    email: String
    savedBooks: [Book]
    bookCount: Int
}

type Book {
    bookId: String
    authors: [String]
    description: String
    image: String
    link: String
    title: String
}

type Auth {
    token: ID!
    user: User
}

type Query {
    me: User
}

input AddUserInput {
    username: String!
    email: String!
    password: String!

}
    input BookInput {
        authors: [String]
        description: String
        title: String
        bookId: String
        image: String
        link: String
    }


type Mutation {
    login(email: String!, password: String!): Auth
    addUser(input: AddUserInput): Auth
    saveBook(input: BookInput): User
    removeBook(bookId: String!): User 
}

`;

export default typeDefs;
