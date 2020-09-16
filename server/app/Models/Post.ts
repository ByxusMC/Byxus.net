import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
