import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Translation from 'App/Models/Translation'

export default class TranslationSeeder extends BaseSeeder {
	public async run() {
		await Translation.createMany([
			{
				code: 'players_online',
				fr: 'Joueurs connectés',
				en: 'Online players'
			}
		])
	}
}
