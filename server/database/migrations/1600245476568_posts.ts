import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Posts extends BaseSchema {
	protected tableName = 'posts'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table
				.integer('category_id')
				.unsigned()
				.references('id')
				.inTable('categories')
			table
				.integer('user_id')
				.unsigned()
				.references('id')
				.inTable('users')
			table.string('label').notNullable()
			table.string('description').notNullable()
			table.boolean('is_resolved').defaultTo(false)
			table.boolean('can_reply').defaultTo(true)
			table.timestamps(true, true)
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
