// import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import UpdateValidator from 'App/Validators/categories/UpdateValidator'
import Translation from 'App/Models/Translation'
import Forum from 'App/Models/Forum'

export default class CategoriesController {
	public async index() {
		const categories = await Category.query()
			.preload('label')
			.preload('slug')
			.preload('forum', (forum) => forum.preload('slug'))
			.preload('posts', (post) => post.preload('comments'))
			.preload('roles', (role) => role.preload('label'))
		return categories
	}

	public async show({ params }: HttpContextContract) {
		const categorie = await Category.query()
			.where('id', params.id)
			.preload('label')
			.preload('slug')
			.preload('forum', (forum) => forum.preload('slug'))
			.preload('posts', (post) => post.preload('comments'))
			.preload('roles', (role) => role.preload('label'))
			.firstOrFail()
		return categorie
	}

	public async store({ request }: HttpContextContract) {
		const { roles, label, slug, forumId } = await request.only(['roles', 'label', 'slug', 'forumId'])
		const categorie = await new Category()
		const forum = await Forum.findOrFail(+forumId)

		await categorie.related('forum').associate(forum)
		await categorie.related('label').associate(await Translation.findOrFail(label))
		await categorie.related('slug').associate(await Translation.findOrFail(slug))
		await categorie.related('roles').sync(roles)

		return categorie
	}

	public async update({ request, params }: HttpContextContract) {
		const categorie = await Category.findOrFail(params.id)
		const data = await request.validate(UpdateValidator)
		const roles = request.input('roles')
		console.log(roles)

		await categorie.merge(data).save()
		if (roles) {
			categorie.related('roles').sync(roles)
		}

		return { message: 'La catégorie a été mis à jour' }
	}

	public async destroy({ params }: HttpContextContract) {
		const categorie = await Category.findOrFail(params.id)

		categorie.delete()
		return { message: 'La catégorie a bien été supprimé' }
	}
}
