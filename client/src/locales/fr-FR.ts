import axios from 'axios'

export default async function () {
	let informations = {}
	const { data } = await axios.get('http://localhost:3333/api/translations')
	data.translations.map((item: any) => {
		const { code, fr } = item
		informations = { ...informations, [code]: fr }
	})
	return informations
}
