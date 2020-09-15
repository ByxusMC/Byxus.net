import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RoleModules extends BaseSchema {
	protected tableName = 'module_role'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('create_id').unsigned().references('id').inTable('modules')
			table.integer('update_id').unsigned().references('id').inTable('modules')
			table.integer('destroy_id').unsigned().references('id').inTable('modules')
			table.integer('role_id').unsigned().references('id').inTable('roles')
			table.timestamps(true, true)
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
