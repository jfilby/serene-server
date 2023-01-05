import { prisma } from 'db'
import { UsersService } from 'service/users/service'

const usersService: UsersService = new UsersService()

export async function userById(parent, args, context, info) {
  // console.log('userById..')

  return usersService.getById(prisma, args.id)
}
