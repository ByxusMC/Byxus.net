import axios from 'axios'

export default async function () {
	let informations = {}
	const { data } = await axios.get('http://localhost:3333/api/translations')
	data.translations.map((item: any) => {
		const { code, en } = item
		informations = { ...informations, [code]: en }
	})
	return informations
}
