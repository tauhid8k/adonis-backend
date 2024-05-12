/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
const AuthController = () => import('#controllers/v1/auth_controller')
const UsersController = () => import('#controllers/v1/users_controller')

router.get('/', async () => {
  return 'Server is running'
})

router
  .group(() => {
    // Public Routes
    router
      .group(() => {
        router.post('/register', [AuthController, 'register'])
        router.post('/login', [AuthController, 'login'])
      })
      .use(middleware.guest())

    // Private Routes
    router
      .group(() => {
        router.get('/user', [UsersController, 'user'])
        router.post('/logout', [AuthController, 'logout'])
      })
      .use(middleware.auth())
  })
  .prefix('/api/v1')
