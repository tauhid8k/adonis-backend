import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  // Auth User
  async user({ response, auth }: HttpContext) {
    const user = auth.use('web').user
    return response.json(user)
  }
}
