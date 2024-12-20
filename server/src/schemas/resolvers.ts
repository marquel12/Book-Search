

import {User} from '../models/index.js';
import { signToken, AuthenticationError } from '../services/auth.js';



// define types for the arguments passed into the resolvers


interface AddUserArgs {
    input:{
    username: string;
    email: string;
    password: string;
    }
    
}



interface SaveBookArgs {
    
    authors: string[];
    description: string;
    title: string;
    bookId: string;
    image: string;
    link: string;
    
}

interface RemoveBookArgs {
    bookId: string;
}

interface LoginUserArgs {
    email: string;
    password: string;
}





const resolvers = {

        // Query to get the authenticated user info
    Query: {
        me: async (_parent: any, _args: any, context: any) => {
            // if user is authenticated return the user data
            if (context.user) {
                console.log(context.user);
                return User.findOne({ _id: context.user.email }).populate('savedBooks');
            }
            // if user is not authenticated return an error
            throw new AuthenticationError('You need to be logged in!');
        }
    },

    Mutation: {
        // Mutation to add a user
        addUser: async (_parent: any, { input }: AddUserArgs) => {
            const user = await User.create({...input}); 
            // sign a token with user info
            const token = signToken(user.username, user.id, user.email);
            return { token, user };
        },
        // Mutation to login a user
        login: async (_parent: any, { email, password }: LoginUserArgs) => {
            // find user by email
            const user = await User.findOne({ email });
            
            // if user not found return an error
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            // check if password is correct
            const correctPw = await user.isCorrectPassword(password);
            // if password is incorrect return an error
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            // sign a token with user info
            const token = signToken(user.username, user.id, user.email);
            return { token, user };
        },

        // Mutation to save a book to a user's `savedBooks` field by adding it to the set (to prevent duplicates)
        saveBook: async (_parent: any, { input }: {input: SaveBookArgs}, context: any) => {
            // if user is authenticated
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user.email },
                    { $addToSet: { savedBooks: input } },
                    { new: true, runValidators: true }
                );
                return updatedUser;
            }
            // if user is not authenticated return an error
            throw new AuthenticationError('You need to be logged in!');
        },

        // Mutation to remove a book from `savedBooks` 
        removeBook: async (_parent: any, { bookId }: RemoveBookArgs, context: any) => {
            // if user is authenticated
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user.email },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            // if user is not authenticated return an error
            throw new AuthenticationError('You need to be logged in!');
        },

    }

};

export default resolvers;
