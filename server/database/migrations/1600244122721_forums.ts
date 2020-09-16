import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Forums extends BaseSchema {
	protected tableName = 'forums'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('label_id').unsigned().references('id').inTable('translations')
			table.timestamps(true)
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
