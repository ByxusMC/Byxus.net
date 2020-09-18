// import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Post from 'App/Models/Post'
import StoreValidator from 'App/Validators/posts/StoreValidator'
import UpdateValidator from 'App/Validators/posts/UpdateValidator'

export default class CategoriesController {
	public async index() {
		const posts = await Post.query()
		return posts
	}

	public async show({ params }: HttpContextContract) {
		const post = await Post.query().where('id', params.id).preload('comments').preload('user').firstOrFail()
		return post
	}

	public async store({ request }: HttpContextContract) {
		const data = await request.validate(StoreValidator)
		const categorie = await Post.create(data)

		return { categorie }
	}

	public async update({ request, params }: HttpContextContract) {
		const categorie = await Post.findOrFail(params.id)
		const data = await request.validate(UpdateValidator)

		await categorie.merge(data).save()

		return { message: 'La catégorie a été mis à jour' }
	}

	public async destroy({ params }: HttpContextContract) {
		const categorie = await Post.findOrFail(params.id)

		categorie.delete()
		return { message: 'La catégorie a bien été supprimé' }
	}
}
