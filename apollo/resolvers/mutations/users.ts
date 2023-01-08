import { prisma } from 'db'
import { UsersService } from 'service/users/service'

const usersService: UsersService = new UsersService()

export async function createBlankUser(parent, args, context, info) {
  // console.log('createBlankUser..')

  return usersService.createBlankUser(prisma)
}

export async function createUserByEmail(parent, args, context, info) {

  return usersService.createUserByEmail(prisma, args.email)
}

export async function getOrCreateUserByEmail(parent, args, context, info) {

  return usersService.getOrCreateUserByEmail(
           prisma,
           args.hasSession,
           args.signedOutId,
           args.email)
}
