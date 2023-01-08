import { UsersService } from '../users/service'

export class AccessService {

  usersService: UsersService = new UsersService()

  async isAdminUser(
          prisma,
          userProfileId: string) {

    // Get UserProfile record
    var userProfile: any = null

    try {
      userProfile = await prisma.userProfile.findUnique({
        where: {
          id: userProfileId
        }
      })
    } catch(NotFound) {}

    if (userProfile === null) {
      return {
        status: false,
        message: 'User not found'
      }
    }

    // Return isAdmin value
    return {
      status: userProfile.isAdmin,
      message: null
    }
  }
}
