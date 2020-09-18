import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Forums extends BaseSchema {
	protected tableName = 'forums'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('label_id').unsigned().references('id').inTable('translations').onDelete('CASCADE')
			table.integer('slug_id').unsigned().references('id').inTable('translations').onDelete('CASCADE')
			table.timestamps(true, true)
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
