class I18n {
	public upateTranslations(i18n: any, langage: string, key: string, value: string) {
		i18n.setLocaleMessage(langage, { ...i18n.messages[langage], [key]: value })
	}
}

export default new I18n()
