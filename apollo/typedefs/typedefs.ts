export const typeDefs = `#graphql

  type StatusAndMessage {
    status: Boolean!
    message: String
  }

  type UserProfile {
    id: String!
    userId: String
  }

  type Query {

    # Users
    isAdminUser(userProfileId: String!): StatusAndMessage!
    userById(id: String!): UserProfile

  }

  type Mutation {

    # Users
    createBlankUser: String!
    createUserByEmail(email: String!): String!
    deactivateUserProfileCurrentIFile(id: String!): Boolean
    getOrCreateUserByEmail(hasSession: Boolean!,
                           signedOutId: String,
                           email: String!): String!

  }

`
