import { DateTime } from 'luxon'
import {
	BaseModel,
	BelongsTo,
	belongsTo,
	column,
	ManyToMany,
	manyToMany
} from '@ioc:Adonis/Lucid/Orm'
import Role from 'App/Models/Role'
import Translation from 'App/Models/Translation'

export default class Module extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public labelId: number

	@belongsTo(() => Translation, {
		foreignKey: 'labelId'
	})
	public label: BelongsTo<typeof Translation>

	@manyToMany(() => Role, {
		pivotForeignKey: 'create_id'
	})
	public create: ManyToMany<typeof Role>

	@manyToMany(() => Role, {
		pivotForeignKey: 'update_id'
	})
	public update: ManyToMany<typeof Role>

	@manyToMany(() => Role, {
		pivotForeignKey: 'destroy_id'
	})
	public destroy: ManyToMany<typeof Role>

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime
}
