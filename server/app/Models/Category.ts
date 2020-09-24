import { DateTime } from 'luxon'
import {
	BaseModel,
	BelongsTo,
	belongsTo,
	column,
	HasMany,
	hasMany,
	ManyToMany,
	manyToMany
} from '@ioc:Adonis/Lucid/Orm'
import Translation from 'App/Models/Translation'
import Post from 'App/Models/Post'
import Role from 'App/Models/Role'
import Forum from 'App/Models/Forum'

export default class Category extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public forumId: number

	@column()
	public labelId: number

	@column()
	public slugId: number

	@belongsTo(() => Translation, { foreignKey: 'labelId' })
	public label: BelongsTo<typeof Translation>

	@belongsTo(() => Translation, { foreignKey: 'slugId' })
	public slug: BelongsTo<typeof Translation>

	@belongsTo(() => Forum)
	public forum: BelongsTo<typeof Forum>

	@hasMany(() => Post)
	public posts: HasMany<typeof Post>

	@manyToMany(() => Role)
	public roles: ManyToMany<typeof Role>

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
