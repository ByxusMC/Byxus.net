import { DateTime } from 'luxon'
import {
	BaseModel,
	BelongsTo,
	belongsTo,
	column,
	HasMany,
	hasMany
} from '@ioc:Adonis/Lucid/Orm'
import User from 'App/Models/User'
import Comment from 'App/Models/Comment'

export default class Post extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public categoryId: number

	@column()
	public userId: number

	@column()
	public label: string

	@column()
	public description: string

	@column()
	public isResolved: boolean

	@column()
	public canReply: boolean

	@belongsTo(() => User)
	public user: BelongsTo<typeof User>

	@hasMany(() => Comment)
	public comments: HasMany<typeof Comment>

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
