import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class RankUsers extends BaseSchema {
	protected tableName = 'rank_user'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('user_id').unsigned().references('id').inTable('users')
			table.integer('rank_id').unsigned().references('id').inTable('ranks')
			table.timestamps(true, true)
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
