import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Module from 'App/Models/Module'

export default class ModuleSeeder extends BaseSeeder {
	public async run() {
		await Module.createMany([
			{
				labelId: 18
			},
			{
				labelId: 19
			},
			{
				labelId: 25
			}
		])
	}
}
