import { gql } from 'graphql-tag';

const userTypeDefs = gql`
  type User {
    id: UUID!
    username: String!
    password: String!
    email: String!
    privilege: String!
    createdAt: String!
    updatedAt: String!
  }

  type Query {
    getUsers: [User!]
    getUserData(at: UUID!): User!
  }

  type Mutation {
    createUser(input: CreateUserInput): User!
    login(input: LoginInput): AuthPayload!
  }

  input CreateUserInput {
    username: String!
    password: String!
    email: String!
    privilege: String!
    active: Boolean!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  type AuthPayload {
    token: String!
  }
`;

export default userTypeDefs;
