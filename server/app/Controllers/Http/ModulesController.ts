// import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Module from 'App/Models/Module'

export default class ModulesController {
	public async index() {
		const modules = await Module.query().preload('label').preload('create').preload('update').preload('destroy')
		return { modules }
	}

	public async show({ params }: HttpContextContract) {
		const module = await Module.query()
			.where('id', params.id)
			.preload('label')
			.preload('create')
			.preload('update')
			.preload('destroy')
			.firstOrFail()
		return { module }
	}

	public async update({ request, params }: HttpContextContract) {
		const module = await Module.findOrFail(params.id)
		const create = await request.input('create')
		const update = await request.input('update')
		const destroy = await request.input('destroy')

		await module.related('create').sync(create)
		await module.related('update').sync(update)
		await module.related('destroy').sync(destroy)

		return { message: 'Le grade a été mis à jour' }
	}
}
