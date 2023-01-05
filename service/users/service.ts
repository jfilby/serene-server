export class UsersService {

  // Code
  async createBlankUser(prisma) {

    // console.log('UsersService.createBlankUser(): start')

    var userProfile: any

    await prisma.$transaction(async (prisma) => {

      userProfile = await prisma.userProfile.create({
        data: {
          isAdmin: false
        }
      })
    })

    return userProfile.id
  }

  async createUserByEmail(prisma, email: string) {

    var user: any
    var userProfile: any

    await prisma.$transaction(async (prisma) => {

      user = await prisma.user.create({
        data: {
          email: email
        }
      })

      userProfile = await prisma.userProfile.create({
        data: {
          userId: user.id,
          isAdmin: false
        }    
      })
    })

    return userProfile.id
  }

  async getById(prisma, id: string) {

    try {
      return await prisma.userProfile.findUnique({
        where: {
          id: id
        }
      })
    } catch(NotFound) {
      return null
    }
  }

  async getOrCreateUserByEmail(
          prisma,
          hasSession: boolean,
          signedOutId: string,
          email: string) {

    var signedInUser: any = null

    // Get user's id of signed-in user (if signed-in)
    if (hasSession) {

      // Get/create user record
      try {
        signedInUser = await prisma.user.findUniqueOrThrow({
          where: {
            email: email
          }
        })
      } catch(NotFound) {}

      if (signedInUser === null) {
        signedInUser = await prisma.user.create({
          data: {
            email: email
          }
        })
      }

      // Get/create userProfile record
      var signedInUserProfile: any = null

      // console.log(`UsersService.getOrCreateUserByEmail(): get userProfile ` +
      //             `records where signedInUser.id = ${signedInUser.id}`)

      try {
          signedInUserProfile = await prisma.userProfile.findUniqueOrThrow({
          where: {
            userId: signedInUser.id
          }
        })

        console.log(`signedInUserProfile: ${signedInUserProfile}`)

      } catch(NotFound) {}

      if (signedInUserProfile === null) {
        signedInUserProfile = await prisma.userProfile.create({
          data: {
            userId: signedInUser.id,
            isAdmin: false
          }
        })
      }

      return signedInUserProfile.id
    }

    // User id exists, use it
    var user: any

    if (signedOutId) {
      // console.log('getting user..')

      user = this.getById(
               prisma,
               signedOutId)

      if (user) {
        if (user['id']) {
          signedOutId = user['id']
        }
      }
    }

    if (!signedOutId) {

      // Create user record
      // console.log('creating user..')

      user = this.createBlankUser(prisma)

      // console.log('user: ' + JSON.stringify(user))

      signedOutId = user['id']
    }

    // Return signedOutId
    return signedOutId
  }
}
