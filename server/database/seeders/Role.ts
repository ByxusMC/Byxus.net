import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'
import Translation from 'App/Models/Translation'

export default class RoleSeeder extends BaseSeeder {
	public async run() {
		await Translation.createMany([
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Manager',
				en: 'Manager'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Administrateur',
				en: 'Administrator'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Responsable',
				en: 'Responsible'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Développeur',
				en: 'Developper'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Modérateur',
				en: 'Moderator'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Assistant',
				en: 'Assistant'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Animateur',
				en: 'Animator'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Architecte',
				en: 'Architect'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Staff',
				en: 'Staff'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Youtubeur',
				en: 'Youtuber'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Ami',
				en: 'Friend'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Posséidon',
				en: 'Posséidon'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Kraken',
				en: 'Kraken'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Poulpe',
				en: 'Octopus'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Poisson',
				en: 'Fish'
			},
			{
				code: 'OKKQUSJIdmQSPYuIaUox0HZyv5NyEmhH',
				fr: 'Membre',
				en: 'Member'
			}
		])

		await Role.createMany([
			{
				labelId: 1,
				color: '#FF0000',
				power: 200
			},
			{
				labelId: 2,
				color: '#FF0000',
				power: 150
			},
			{
				labelId: 3,
				color: '#FF5555',
				power: 140
			},
			{
				labelId: 4,
				color: '#1962FF',
				power: 130
			},
			{
				labelId: 5,
				color: '#FBFF00',
				power: 120
			},
			{
				labelId: 6,
				color: '#00FF49',
				power: 110
			},
			{
				labelId: 7,
				color: '#FFC500',
				power: 100
			},
			{
				labelId: 8,
				color: '#00FFEC',
				power: 90
			},
			{
				labelId: 9,
				color: '#00FF49',
				power: 80
			},
			{
				labelId: 10,
				color: '#FF5555',
				power: 70
			},
			{
				labelId: 11,
				color: '#FF58E3',
				power: 60
			},
			{
				labelId: 12,
				color: '#00C5FF',
				power: 40
			},
			{
				labelId: 13,
				color: '#FBFF00',
				power: 30
			},
			{
				labelId: 14,
				color: '#FFC500',
				power: 20
			},
			{
				labelId: 15,
				color: '#00C5FF',
				power: 10
			},
			{
				labelId: 16,
				color: '#9E9E9E',
				power: 0
			}
		])
	}
}
