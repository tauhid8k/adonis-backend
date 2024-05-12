import vine from '@vinejs/vine'

/**
 * Validate user registration
 */
export const registerValidator = vine.compile(
  vine.object({
    name: vine.string().trim(),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8),
  })
)

/**
 * Validate user login
 */
export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string(),
    remember_me: vine.boolean().optional(),
  })
)
