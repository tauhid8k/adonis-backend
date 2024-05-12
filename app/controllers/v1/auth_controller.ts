import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth_validator'
import User from '#models/user'

export default class AuthController {
  // Register User
  async register({ request, response, auth }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.create(payload)

    await auth.use('web').login(user)

    // TODO: Send verification email

    return response.status(201).json({
      message: 'Registration successful',
    })
  }

  // Login User
  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user, !!request.input('remember_me'))

    return response.json({
      message: 'Login successful',
    })
  }

  // Logout User
  async logout({ response, auth }: HttpContext) {
    await auth.use('web').logout()

    return response.json({
      message: 'You are now logged out',
    })
  }
}
