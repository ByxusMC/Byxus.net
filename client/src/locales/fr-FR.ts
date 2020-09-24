import AxiosConfig from '../../config/Axios'
import axios from 'axios'

export default async function () {
	let informations = {}
	const { data } = await axios.get(AxiosConfig.baseURL + '/translations')
	data.map((item: any) => {
		const { code, fr } = item
		informations = { ...informations, [code]: fr }
	})
	return informations
}
