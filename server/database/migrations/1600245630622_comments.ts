import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Comments extends BaseSchema {
	protected tableName = 'comments'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('post_id').unsigned().references('id').inTable('posts')
			table.integer('user_id').unsigned().references('id').inTable('users')
			table.string('message').notNullable()
			table.timestamps(true, true)
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
