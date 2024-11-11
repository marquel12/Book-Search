const typeDefs = `

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

type query {
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

    type Query {
    users: [User]
    searchBooks(query: String!): [Book]    
    user(username: String!): User  
    book(bookId: String!): Book  
    savedBooks: [Book] 
}

type mutation {
    login(email: String!, password: String!): Auth
    addUser(input: AddUserInput: Auth
    addBook(input: BookInput: String!): User
    removeBook(bookId: String!): User 
}

`;