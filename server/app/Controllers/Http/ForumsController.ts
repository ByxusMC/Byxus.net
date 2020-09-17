// import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Forum from 'App/Models/Forum'
import UpdateValidator from 'App/Validators/forums/UpdateValidator'
import Translation from 'App/Models/Translation'

export default class ForumsController {
	public async index() {
		return await Forum.query()
			.preload('label', (label) => label.select(['id', 'code', 'fr', 'en']))
			.preload('slug', (slug) => slug.select(['id', 'code', 'fr', 'en']))
			.preload('categories', (categorie) => {
				categorie.preload('label', (label) => label.select(['id', 'code', 'fr', 'en']))
				categorie.preload('slug', (slug) => slug.select(['id', 'code', 'fr', 'en']))
				categorie.withCount('posts')
				categorie.limit(5)
				categorie.preload('posts', (post) => {
					post.select(['id'])
					post.withCount('comments')
				})
			})
			.preload('roles', (role) => {
				role.preload('label', (label) => {
					label.select(['code'])
				})
			})
	}

	public async show({ params }: HttpContextContract) {
		return await Forum.query()
			.where('id', params.id)
			.preload('label')
			.preload('categories')
			.firstOrFail()
	}

	public async store({ request }: HttpContextContract) {
		const forum = await new Forum()
		const { roles, label, slug } = await request.only(['roles', 'label', 'slug'])

		await forum.related('label').associate(await Translation.findOrFail(label))
		await forum.related('slug').associate(await Translation.findOrFail(slug))
		await forum.related('roles').sync(roles)

		return forum
	}

	public async update({ request, params }: HttpContextContract) {
		const roles = request.input('roles')
		const forum = await Forum.findOrFail(params.id)
		const data = await request.validate(UpdateValidator)

		await forum.merge(data).save()
		if (roles) {
			await forum.related('roles').sync(roles)
		}

		return { message: 'Le forum a été mis à jour' }
	}

	public async destroy({ params }: HttpContextContract) {
		const forum = await Forum.findOrFail(params.id)
		await forum.related('roles').detach()
		await forum.related('label').dissociate()
		await forum.related('slug').dissociate()

		await forum.delete()
		return { message: 'Le forum a bien été supprimé' }
	}
}
