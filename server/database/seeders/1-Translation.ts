import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Translation from 'App/Models/Translation'

export default class TranslationSeeder extends BaseSeeder {
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
			},
			{
				code: 'players_online',
				fr: 'Joueurs connectés',
				en: 'Online players'
			},
			{
				code: 'WVum9UMpU6HxBmDnKXO8cU5iG3BsToj7',
				fr: 'Profil des membres',
				en: "Member's profil"
			},
			{
				code: 'WVum9UMpU6HxBmDnKXO8cU5iG3BsToj8',
				fr: 'Forums',
				en: 'Forums'
			},
			{
				code: 'players_is_ban',
				fr: 'Banni',
				en: 'Banned'
			},
			{
				code: 'players_is_unban',
				fr: 'Non banni',
				en: 'Not banned'
			},
			{
				code: 'is_now',
				fr: 'est maintenant',
				en: 'is now'
			},
			{
				code: 'roles_update',
				fr: 'Les rôles ont été mis à jour',
				en: 'Roles have been updated'
			}
		])
	}
}
