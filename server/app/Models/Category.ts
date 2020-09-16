import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import Translation from 'App/Models/Translation'
import Post from 'App/Models/Post'

export default class Category extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public forumId: number

	@column()
	public labelId: number

	@belongsTo(() => Translation, { foreignKey: 'labelId' })
	public label: BelongsTo<typeof Translation>

	@hasMany(() => Post)
	public posts: HasMany<typeof Post>

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
