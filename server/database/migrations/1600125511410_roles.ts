import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Roles extends BaseSchema {
	protected tableName = 'roles'

	public async up() {
		this.schema.table(this.tableName, (table) => {
			table.integer('label_id').unsigned().references('id').inTable('translations')
		})
	}

	public async down() {
		this.schema.table(this.tableName, (table) => {
			table.dropColumn('label_id')
		})
	}
}
