import type { HttpContext } from '@adonisjs/core/http'
import { registerValidator, loginValidator } from '#validators/auth_validator'
import User from '#models/user'

export default class AuthController {
  // Register User
  async register({ request, response }: HttpContext) {
    const payload = await request.validateUsing(registerValidator)

    const user = await User.create(payload)

    // TODO: Send verification email

    return response.status(201).json({
      message: 'Registration successful',
      formMessage: 'We have sent a verification link to your email. Please verify to continue',
    })
  }

  // Login User
  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password)

    // Check email verification
    if (!user.emailVerifiedAt) {
      // TODO: Send verification email

      return response.json({
        formMessage: 'We have sent a verification link to your email. Please verify to continue',
      })
    }

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
