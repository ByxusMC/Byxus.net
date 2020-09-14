<template>
	<div style="min-height: 100vh">
		<Header />
		<Navbar />
		<LangSwitcher />
		<Nuxt />
	</div>
</template>

<script>
import Navbar from '~/components/Navbar'
import LangSwitcher from '~/components/LangSwitcher'
import Header from '~/components/Header'

export default {
	name: 'master',
	components: { Navbar, LangSwitcher, Header },
}
</script>

<style lang="scss" scoped>
body {
	width: 100%;
	min-height: 100%;
}
</style>
