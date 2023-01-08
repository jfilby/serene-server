import 'db'
import { createBlankUser, createUserByEmail, getOrCreateUserByEmail } from './mutations/users'
import { isAdminUser } from './queries/access'
import { userById } from './queries/users'

// Code
const Query = {
  // Users
  userById
}

const Mutation = {
  // Access
  isAdminUser,

  // Users
  createBlankUser,
  createUserByEmail,
  getOrCreateUserByEmail
}

const resolvers = { Query, Mutation }

export default resolvers
