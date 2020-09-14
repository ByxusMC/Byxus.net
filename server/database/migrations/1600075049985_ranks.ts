import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Ranks extends BaseSchema {
	protected tableName = 'ranks'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('user_id').unsigned().references('id').inTable('users')
			table.integer('label_id').unsigned().references('id').inTable('translations')
			table.string('color').notNullable()
			table.timestamps(true, true)
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
