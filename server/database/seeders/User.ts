import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
	public async run() {
		await User.create({
			pseudonyme: 'Freeze455',
			uuid: 'UUID',
			is_active: true,
			is_confirmed: true,
			is_ban: false,
			email: 'baptiste.parmantier.pro@gmail.fr',
			password: '486279315Aa?'
		})
	}
}
