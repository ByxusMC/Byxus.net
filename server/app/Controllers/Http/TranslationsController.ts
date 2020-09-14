// import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Translation from 'App/Models/Translation'
import StoreValidator from 'App/Validators/translations/StoreValidator'
import UpdateValidator from 'App/Validators/translations/UpdateValidator'
import randomstring from 'randomstring'

export default class TranslatinsController {
	public async index() {
		const tanslations = await Translation.all()
		return { tanslations }
	}

	public async show({ params }: HttpContextContract) {
		const tanslation = await Translation.findOrFail(params.id)
		return { tanslation }
	}

	public async store({ request }: HttpContextContract) {
		const data = await request.validate(StoreValidator)
		const code = randomstring.generate()
		const tanslation = await Translation.create({ ...data, code })

		return { tanslation }
	}

	public async update({ request, params }: HttpContextContract) {
		const tanslation = await Translation.findOrFail(params.id)
		const data = await request.validate(UpdateValidator)

		await tanslation.merge(data).save()

		return { message: 'La traduction a été mis à jour' }
	}

	public async destroy({ params }: HttpContextContract) {
		const tanslation = await Translation.findOrFail(params.id)

		tanslation!.delete()
		return { message: 'La traduction a bien été supprimé' }
	}
}
