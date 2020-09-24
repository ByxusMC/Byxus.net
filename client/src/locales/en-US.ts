import AxiosConfig from '../../config/Axios'
import axios from 'axios'

export default async function () {
	let informations = {}
	const { data } = await axios.get(AxiosConfig.baseURL + '/translations')
	data.map((item: any) => {
		const { code, en } = item
		informations = { ...informations, [code]: en }
	})
	return informations
}
