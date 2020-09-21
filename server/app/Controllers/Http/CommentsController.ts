import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Comment from 'App/Models/Comment'
import StoreValidator from 'App/Validators/comments/StoreValidator'
import UpdateValidator from 'App/Validators/comments/UpdateValidator'

export default class CommentsController {
	public async index() {
		const comments = await Comment.query()
		return comments
	}

	public async show({ params }: HttpContextContract) {
		const comment = await Comment.query().where('id', params.id).firstOrFail()
		return comment
	}

	public async store({ request }: HttpContextContract) {
		const data = await request.validate(StoreValidator)
		const comment = await Comment.create(data)

		return comment
	}

	public async update({ request, params }: HttpContextContract) {
		const comment = await Comment.findOrFail(params.id)
		const data = await request.validate(UpdateValidator)

		await comment.merge(data).save()

		return { message: 'La catégorie a été mis à jour' }
	}

	public async destroy({ params }: HttpContextContract) {
		const categorie = await Comment.findOrFail(params.id)

		categorie.delete()
		return { message: 'La catégorie a bien été supprimé' }
	}
}
