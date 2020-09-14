import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import { schema, rules } from '@ioc:Adonis/Core/Validator'

export default class AuthController {
	public async loginWeb({ request, auth }: HttpContextContract) {
		console.log(request.all())

		const data = await request.validate({
			schema: schema.create({
				email: schema.string({ trim: true }, [rules.email()]),
				password: schema.string({ trim: true }),
				remember_me: schema.boolean.optional()
			}),
			messages: {
				'email.required': 'Veuillez insérer une adresse email',
				'email.email': 'Veuillez insérer une adresse email valide',
				'password.required': 'Veuillez insérer un mot de passe'
			}
		})

		const { email, password, remember_me } = data

		try {
			await auth.attempt(email, password, remember_me)
			return { user: auth.user }
		} catch (error) {
			console.log(error.code)
			if (error.code === 'E_INVALID_AUTH_UID') return { error: "L'utilisateur n'a pas été trouvé" }
			if (error.code === 'E_INVALID_AUTH_PASSWORD') return { error: "L'identifiant ou le mot de passe est incorrecte" }
		}
	}

	public async logoutWeb({ auth }: HttpContextContract) {
		await auth.logout()
		return { message: 'Vous avez été déconnecté' }
	}

	public async loginApi({ request, auth }: HttpContextContract) {
		const email = request.input('email')
		const password = request.input('password')

		const token = await auth.use('api').attempt(email, password, {
			expiresIn: '10 days'
		})
		return { token: token.toJSON() }
	}

	public async logoutApi({ auth }: HttpContextContract) {
		await auth.use('api').logout()
		return { message: 'Vous avez été déconnecté' }
	}

	public async user({ auth }: HttpContextContract) {
		console.log('auth')
		await auth.authenticate()
		return { user: auth.user }
	}
}
