import { gql } from 'apollo-server';

export const typeDefs = gql`
  type Query {
    searchProfiles(query: String!): [Profile]
    getProfile(id: ID!): Profile
    listProfiles: [Profile]
  }

  type Mutation {
    createProfile(name: String!, age: Int!, email: String!): Profile
    updateProfile(id: ID!, name: String, age: Int, email: String): Profile
    deleteProfile(id: ID!): Profile
  }

  type Profile {
    id: ID!
    name: String!
    age: Int!
    email: String!
  }
`;
