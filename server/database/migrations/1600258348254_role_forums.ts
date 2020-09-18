import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RoleForums extends BaseSchema {
	protected tableName = 'forum_role'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('role_id').unsigned().references('id').inTable('roles')
			table.integer('forum_id').unsigned().references('id').inTable('forums').onDelete('CASCADE')
			table.timestamps(true, true)
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
