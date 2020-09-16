// import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Forum from 'App/Models/Forum'
import StoreValidator from 'App/Validators/forums/StoreValidator'
import UpdateValidator from 'App/Validators/forums/UpdateValidator'

export default class ForumsController {
	public async index() {
		const forums = await Forum.query().preload('label')
		return { forums }
	}

	public async show({ params }: HttpContextContract) {
		const forum = await Forum.query()
			.where('id', params.id)
			.preload('label')
			.preload('categories')
			.firstOrFail()
		return { forum }
	}

	public async store({ request }: HttpContextContract) {
		const data = await request.validate(StoreValidator)
		const forum = await Forum.create(data)

		return { forum }
	}

	public async update({ request, params }: HttpContextContract) {
		const forum = await Forum.findOrFail(params.id)
		const data = await request.validate(UpdateValidator)

		await forum.merge(data).save()

		return { message: 'Le forum a été mis à jour' }
	}

	public async destroy({ params }: HttpContextContract) {
		const forum = await Forum.findOrFail(params.id)

		forum.delete()
		return { message: 'Le forum a bien été supprimé' }
	}
}
