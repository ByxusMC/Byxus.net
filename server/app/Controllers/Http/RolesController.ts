// import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import StoreValidator from 'App/Validators/roles/StoreValidator'
import UpdateValidator from 'App/Validators/roles/UpdateValidator'

export default class RolesController {
	public async index() {
		return await Role.query().preload('label', (label) => {
			label.select(['code'])
		})
	}

	public async show({ params }: HttpContextContract) {
		return await Role.query()
			.where('id', params.id)
			.preload('label')
			.firstOrFail()
	}

	public async store({ request }: HttpContextContract) {
		const data = await request.validate(StoreValidator)
		const role = await Role.create(data)

		return role
	}

	public async update({ request, params }: HttpContextContract) {
		const role = await Role.findOrFail(params.id)
		const data = await request.validate(UpdateValidator)

		await role.merge(data).save()

		return { message: 'Le grade a été mis à jour' }
	}

	public async destroy({ params }: HttpContextContract) {
		const role = await Role.findOrFail(params.id)
		await role.delete()

		return { message: 'Le grade a bien été supprimé' }
	}
}
