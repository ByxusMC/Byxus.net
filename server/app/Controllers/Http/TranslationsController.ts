// import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Translation from 'App/Models/Translation'
import StoreValidator from 'App/Validators/translations/StoreValidator'
import UpdateValidator from 'App/Validators/translations/UpdateValidator'
import randomstring from 'randomstring'

export default class TranslatinsController {
	public async index() {
		const translations = await Translation.all()
		return translations
	}

	public async show({ params }: HttpContextContract) {
		const translation = await Translation.findOrFail(params.id)
		return translation
	}

	public async store({ request }: HttpContextContract) {
		const data = await request.validate(StoreValidator)
		const code = randomstring.generate()
		const translation = await Translation.create({ ...data, code })

		return translation
	}

	public async update({ request, params }: HttpContextContract) {
		const translation = await Translation.findOrFail(params.id)
		const data = await request.validate(UpdateValidator)

		await translation.merge(data).save()

		return { message: 'La traduction a été mis à jour' }
	}

	public async destroy({ params }: HttpContextContract) {
		const translation = await Translation.findOrFail(params.id)

		translation!.delete()
		return { message: 'La traduction a bien été supprimé' }
	}
}
