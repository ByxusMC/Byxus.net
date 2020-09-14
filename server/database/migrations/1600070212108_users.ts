import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Users extends BaseSchema {
	protected tableName = 'users'

	public async up() {
		this.schema.table(this.tableName, (table) => {
			table.string('pseudonyme').notNullable()
			table.string('uuid')
			table.boolean('is_active')
			table.string('confirmation_token')
			table.string('recovery_token')
			table.boolean('is_confirmed')
			table.boolean('is_ban')
		})
	}

	public async down() {
		this.schema.table(this.tableName, (table) => {
			table.dropColumn('pseudonyme')
			table.dropColumn('uuid')
			table.dropColumn('is_active')
			table.dropColumn('confirmation_token')
			table.dropColumn('recovery_token')
			table.dropColumn('is_confirmed')
			table.dropColumn('is_ban')
		})
	}
}
