<template>
	<div class="forum-category">
		<div class="label">
			<nuxt-link :to="formatSlug()" class="h6 no-styling">
				<i class="icon-comment-dots"></i>
				{{ post.label }}
			</nuxt-link>
		</div>
		<div class="informations">
			<div class="category-item">
				<span class="header-information">Messages</span>
				<p>{{ post.comments.length }}</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'PostsContainer',
	props: ['post', 'category'],
	methods: {
		formatSlug() {
			return `/forums/${this.$t(this.category.forum.slug.code)}/${this.$t(
				this.category.slug.code
			)}/${this.post.label.replace(/ /g, '-').toLowerCase()}/${this.post.id}`
		},
	},
	mounted() {
		console.log(this.post, this.category)
	},
}
</script>

<style lang="scss" scoped></style>
