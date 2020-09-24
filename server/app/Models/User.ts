import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel, manyToMany, ManyToMany } from '@ioc:Adonis/Lucid/Orm'
import Role from 'App/Models/Role'

export default class User extends BaseModel {
	@column({ isPrimary: true })
	public id: number

	@column()
	public pseudonyme: string

	@column()
	public uuid: string

	@column()
	public email: string

	@column()
	public is_active: boolean

	@column()
	public confirmation_token: string

	@column()
	public is_confirmed: boolean

	@column()
	public password: string

	@column()
	public rememberMeToken?: string

	@column()
	public recovery_token: string

	@column()
	public is_ban: boolean

	@manyToMany(() => Role)
	public roles: ManyToMany<typeof Role>

	@column.dateTime({ autoCreate: true })
	public createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	public updatedAt: DateTime

	@beforeSave()
	public static async hashPassword(user: User) {
		if (user.$dirty.password) {
			user.password = await Hash.make(user.password)
		}
	}
}
