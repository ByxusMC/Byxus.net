/*
 ** Headers module configuration
 ** See https://nuxtjs.org/api/configuration-head
 ** See https://vue-meta.nuxtjs.org/api/#metainfo-properties
 */
export default {
	htmlAttrs: {
		lang: 'fr-FR',
	},
	title: 'Byxus | Serveur minecraft 1.8x-1.12x',
	meta: [
		{ charset: 'utf-8' },
		{ lang: 'fr-FR' },
		{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
		{ hid: 'description', name: 'description', content: 'Le network Byxus.fr est un projet minecraft orienté mini-jeux utilisant les versions 1.8x à 1.12x, créé par des joueurs, pour des joueurs.' },

		{ hid: 'og:type', name: 'og:type', content: 'website' },
		{ hid: 'og:url', name: 'og:url', content: 'https://www.byxus.fr' },
		{ hid: 'og:title', name: 'og:title', content: 'Byxus | Serveur minecraft 1.8x-1.12x' },
		{ hid: 'og:site_name', name: 'og:site_name', content: 'Byxus | Serveur minecraft 1.8x-1.12x' },
		{ hid: 'og:locale', name: 'og:locale', content: 'fr' },
		{ hid: 'og:image', name: 'og:image', content: '/images/meta-image.jpg' },

		{ name: 'msapplication-TileColor', content: '#0DA5FF' },
		{ name: 'theme-color', content: '#0DA5FF' },
	],
	link: [{ rel: 'icon', type: 'image/jpg', href: '/images/favicon.png' }],
}
