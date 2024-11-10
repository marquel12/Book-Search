const typeDefs = `

type User {
    _id: ID!
    username: String
    email: String
    password: String
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

`;