import { prisma } from 'db'
import { AccessService } from 'service/access/service'

const accessService: AccessService = new AccessService()

export async function isAdminUser(parent, args, context, info) {

  return accessService.isAdminUser(
           prisma,
           args.userProfileId)
}
