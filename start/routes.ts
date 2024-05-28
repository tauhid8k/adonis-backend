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

router.get('/', async () => {
  return 'Server is running'
})

router
  .group(() => {
    // Public Routes
    router.group(() => {
      router.get('/auth', [AuthController, 'isAuthenticated'])
      router.post('/register', [AuthController, 'register'])
      router.post('/login', [AuthController, 'login'])
    })

    // Private Routes
    router
      .group(() => {
        router.post('/logout', [AuthController, 'logout'])
      })
      .use(middleware.auth())
  })
  .prefix('/api/v1')
