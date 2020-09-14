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
				code: 'G4rB97PhXazIvVgX1d1E9N46GrJ8Ce5k',
				fr: 'Administrateur',
				en: 'Administrator'
			},
			{
				code: 'AKY12FiXXLzdPybtfnxq1JO25YBT1av5',
				fr: 'Responsable',
				en: 'Responsible'
			},
			{
				code: 'Bv8cWshM8IDuif2GvoHOeMk2zH561J7Q',
				fr: 'Développeur',
				en: 'Developper'
			},
			{
				code: 'zDnAhyQMPTz6RzWVqvCc1p0KeUI4Ox7h',
				fr: 'Modérateur',
				en: 'Moderator'
			},
			{
				code: 'cYsYg9wFFzjGAu6TnWUVSX8oN02jsHcS',
				fr: 'Assistant',
				en: 'Assistant'
			},
			{
				code: '4dw9lJhbQ8Fj6nYxHWSVvH38ZdxARikO',
				fr: 'Animateur',
				en: 'Animator'
			},
			{
				code: 'NB5qLqzZRIfenBoQi04kPZ6Gh0g56OJ5',
				fr: 'Architecte',
				en: 'Architect'
			},
			{
				code: '7PthSYtvYbK4rEpiTVUwVf3ysiRfqZtO',
				fr: 'Staff',
				en: 'Staff'
			},
			{
				code: 'pzlo9GWYG38zWfROcCk9ZXUsFYjYL072',
				fr: 'Youtubeur',
				en: 'Youtuber'
			},
			{
				code: 'gSSZKXVFy5TjJtJj4rupqkK2Z2kdkinJ',
				fr: 'Ami',
				en: 'Friend'
			},
			{
				code: 'J13ScVKtAVAUWlCKL416sVUeOdZxk2Ko',
				fr: 'Posséidon',
				en: 'Posséidon'
			},
			{
				code: 'nzwTNbaWtbIQEvckO4ASNuGVYB7dYWbD',
				fr: 'Kraken',
				en: 'Kraken'
			},
			{
				code: 'mlWId947SLBPl1jVcxRbLR48x48ZEylx',
				fr: 'Poulpe',
				en: 'Octopus'
			},
			{
				code: 'AXmCdsm4CMHJVuGwAG2ySzFrAvcbsmBq',
				fr: 'Poisson',
				en: 'Fish'
			},
			{
				code: '0APMlBUH7kdAhzM8R8olgQdwbxRmcKTU',
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
