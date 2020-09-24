import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TranslationRoles extends BaseSchema {
	protected tableName = 'translation_roles'

	public async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')
			table.integer('translation_id').unsigned().references('id').inTable('translations')
			table.integer('role_id').unsigned().references('id').inTable('roles')
			table.timestamps(true, true)
		})
	}

	public async down() {
		this.schema.dropTable(this.tableName)
	}
}
