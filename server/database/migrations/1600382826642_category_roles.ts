import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class CategoryRoles extends BaseSchema {
	protected tableName = 'category_role'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('category_id').unsigned().references('id').inTable('categories')
			table.integer('role_id').unsigned().references('id').inTable('roles')
			table.timestamps(true, true)
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
