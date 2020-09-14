// import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Rank from 'App/Models/Rank'
import StoreValidator from 'App/Validators/ranks/StoreValidator'
import UpdateValidator from 'App/Validators/ranks/UpdateValidator'

export default class RanksController {
	public async index() {
		const ranks = await Rank.query()
		return { ranks }
	}

	public async show({ params }: HttpContextContract) {
		const rank = await Rank.findOrFail(params.id)
		return { rank }
	}

	public async store({ request }: HttpContextContract) {
		const data = await request.validate(StoreValidator)
		const rank = await Rank.create(data)

		return { rank }
	}

	public async update({ request, params }: HttpContextContract) {
		const rank = await Rank.findOrFail(params.id)
		const data = await request.validate(UpdateValidator)

		await rank.merge(data).save()

		return { message: 'Le grade a été mis à jour' }
	}

	public async destroy({ params }: HttpContextContract) {
		const rank = await Rank.findOrFail(params.id)

		rank.delete()
		return { message: 'Le grade a bien été supprimé' }
	}
}
