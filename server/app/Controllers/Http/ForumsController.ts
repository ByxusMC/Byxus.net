// import Application from '@ioc:Adonis/Core/Application'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Forum from 'App/Models/Forum'
import StoreValidator from 'App/Validators/forums/StoreValidator'
import UpdateValidator from 'App/Validators/forums/UpdateValidator'

export default class ForumsController {
	public async index() {
		let postCount: number = 0
		let messageCount: number = 0

		const forums = await Forum.query()
			.preload('label', (label) => {
				label.select(['id', 'code', 'fr', 'en'])
			})
			.preload('categories', (categorie) => {
				categorie.preload('label', (label) => {
					label.select(['id', 'code', 'fr', 'en'])
				})
				categorie.withCount('posts')
				categorie.limit(5)
				categorie.preload('posts', (post) => {
					post.select(['id'])
					post.withCount('comments')
				})
			})
			.preload('roles', (role) => {
				role.preload('label')
			})

		forums.forEach((forum) => {
			forum.categories.forEach((category) => {
				postCount = postCount + category.$extras.posts_count
				category.posts.forEach((post) => {
					messageCount = messageCount + post.$extras.comments_count
				})
			})
		})

		return {
			forums,
			count: {
				postCount,
				messageCount
			}
		}
	}

	public async show({ params }: HttpContextContract) {
		const forum = await Forum.query()
			.where('id', params.id)
			.preload('label')
			.preload('categories')
			.firstOrFail()
		return { forum }
	}

	public async store({ request }: HttpContextContract) {
		const data = await request.validate(StoreValidator)
		const roles = request.input('roles')
		const forum = await Forum.create(data)
		await forum.related('roles').sync(roles)

		return { forum }
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

		forum.delete()
		return { message: 'Le forum a bien été supprimé' }
	}
}
