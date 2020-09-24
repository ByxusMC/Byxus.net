/*
 ** Toasts module configuration
 ** See https://github.com/nuxt-community/modules/tree/master/packages/toast
 */
export default {
	position: 'bottom-left',
	theme: 'bubble',
	duration: 5000,
	keepOnHover: true,
	action: {
		text: 'FERMER',
		onClick: (e: any, toastObject: any) => {
			toastObject.goAway(0)
		},
	},
	register: [
		{
			name: 'error',
			message: ({ message }: any) => message,
			options: {
				position: 'bottom-left',
				keepOnHover: true,
				icon: 'do_not_disturb',
				type: 'error',
				action: {
					text: 'fermer',
					onClick: (e: any, toastObject: any) => {
						toastObject.goAway(0)
					},
				},
			},
		},
		{
			name: 'success',
			message: ({ message }: any) => message,
			options: {
				position: 'bottom-left',
				duration: 5000,
				keepOnHover: true,
				icon: 'check',
				type: 'success',
				action: {
					text: 'fermer',
					onClick: (e: any, toastObject: any) => {
						toastObject.goAway(0)
					},
				},
			},
		},
		{
			name: 'info',
			message: ({ message }: any) => message,
			options: {
				position: 'bottom-left',
				duration: 5000,
				keepOnHover: true,
				icon: 'info',
				type: 'info',
				action: {
					text: 'fermer',
					onClick: (e: any, toastObject: any) => {
						toastObject.goAway(0)
					},
				},
			},
		},
	],
}
