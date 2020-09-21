<template>
	<div class="forum-banner">
		<div class="container">
			<h1>{{ title }}</h1>
			<p>
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugiat illum ipsa nostrum
				iusto nesciunt. Quo modi itaque odit vel animi.
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ForumBanner',
	data() {
		return {
			title: '',
		}
	},
	methods: {
		format(params) {
			let world = params.replace(/-/g, ' ')
			const splited = world.split('')
			splited.splice(0, 1)
			return `${world.charAt(0).toUpperCase()}${splited.join('')}`
		},
	},
	mounted() {
		const { params } = this.$route
		console.log(typeof params)
		if (params.forumslug || params.category) {
			if (params.posts) {
				return (this.title = this.format(params.posts))
			}
			if (params.category) {
				return (this.title = this.format(params.category))
			}
			return (this.title = this.format(params.forumslug))
		}
		return (this.title = 'Forums byxus.fr')
	},
}
</script>

<style lang="scss" scoped>
.forum-banner {
	min-height: 150px;
	background: rgb(8, 156, 255);
	position: relative;
	.container {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		h1,
		p {
			color: white;
			max-width: 50%;
		}
	}
}
</style>
