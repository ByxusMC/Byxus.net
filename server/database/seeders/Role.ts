import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
	public async run() {
		await Role.createMany([
			{
				label: 'Manager',
				color: '#FF0000',
				power: 200
			},
			{
				label: 'Administrateur',
				color: '#FF0000',
				power: 150
			},
			{
				label: 'Responsable',
				color: '#FF5555',
				power: 140
			},
			{
				label: 'Développeur',
				color: '#1962FF',
				power: 130
			},
			{
				label: 'Modérateur',
				color: '#FBFF00',
				power: 120
			},
			{
				label: 'Assistant',
				color: '#00FF49',
				power: 110
			},
			{
				label: 'Animateur',
				color: '#FFC500',
				power: 100
			},
			{
				label: 'Architecte',
				color: '#00FFEC',
				power: 90
			},
			{
				label: 'Staff',
				color: '#00FF49',
				power: 80
			},
			{
				label: 'Youtuber',
				color: '#FF5555',
				power: 70
			},
			{
				label: 'Ami',
				color: '#FF58E3',
				power: 60
			},
			{
				label: 'Posséidon',
				color: '#00C5FF',
				power: 40
			},
			{
				label: 'Kraken',
				color: '#FBFF00',
				power: 30
			},
			{
				label: 'Poulpe',
				color: '#FFC500',
				power: 20
			},
			{
				label: 'Poisson',
				color: '#00C5FF',
				power: 10
			},
			{
				label: 'Membre',
				color: '#9E9E9E',
				power: 0
			}
		])
	}
}
