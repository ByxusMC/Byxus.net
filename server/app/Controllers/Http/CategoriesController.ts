// import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import StoreValidator from 'App/Validators/categories/StoreValidator'
import UpdateValidator from 'App/Validators/categories/UpdateValidator'

export default class CategoriesController {
	public async index() {
		const categories = await Category.query().preload('label')
		return { categories }
	}

	public async show({ params }: HttpContextContract) {
		const categorie = await Category.query()
			.where('id', params.id)
			.preload('label')
			.preload('posts')
			.firstOrFail()
		return { categorie }
	}

	public async store({ request }: HttpContextContract) {
		const data = await request.validate(StoreValidator)
		const categorie = await Category.create(data)

		return { categorie }
	}

	public async update({ request, params }: HttpContextContract) {
		const categorie = await Category.findOrFail(params.id)
		const data = await request.validate(UpdateValidator)

		await categorie.merge(data).save()

		return { message: 'La catégorie a été mis à jour' }
	}

	public async destroy({ params }: HttpContextContract) {
		const categorie = await Category.findOrFail(params.id)

		categorie.delete()
		return { message: 'La catégorie a bien été supprimé' }
	}
}
