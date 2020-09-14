// import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import StoreValidator from 'App/Validators/users/StoreValidator'
import UpdateValidator from 'App/Validators/users/UpdateValidator'

export default class UsersController {
	public async index() {
		const users = await User.query().preload('roles')
		return { users }
	}

	public async show({ params }: HttpContextContract) {
		const user = await User.findOrFail(params.id)
		return { user }
	}

	public async store({ request }: HttpContextContract) {
		const data = await request.validate(StoreValidator)
		const user = await User.create(data)

		return { user }
	}

	public async update({ request, params }: HttpContextContract) {
		const user = await User.findOrFail(params.id)
		const roles = await request.input('roles')

		// if (user.id != auth.user!.id) {
		// 	return response.unauthorized()
		// }

		const data = await request.validate(UpdateValidator)
		console.log(user, roles, data)

		await user.merge(data).save()
		await user.related('roles').sync(roles)

		return { message: 'Le compte a été mis à jour' }
	}

	public async destroy({ response, params, auth }: HttpContextContract) {
		const user = await User.findOrFail(params.id)

		if (user.id != auth.user!.id) {
			return response.unauthorized()
		}

		auth.user!.delete()
		return { message: "L'utilisateur a bien été supprimé" }
	}
}
