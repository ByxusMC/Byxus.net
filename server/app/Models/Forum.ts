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
import Category from 'App/Models/Category'
import Role from 'App/Models/Role'

export default class Forum extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public labelId: number

	@belongsTo(() => Translation, { foreignKey: 'labelId' })
	public label: BelongsTo<typeof Translation>

	@hasMany(() => Category)
	public categories: HasMany<typeof Category>

	@manyToMany(() => Role)
	public roles: ManyToMany<typeof Role>

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
