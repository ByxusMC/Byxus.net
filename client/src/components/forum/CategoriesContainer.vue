<template>
	<div class="">
		<div class="forum-category">
			<div class="label">
				<i class="icon-comment-dots"></i>
				<nuxt-link
					:to="`/forums/${$t(category.label.code)}/${$t(category.label.code)}/`"
					class="h6 no-styling"
					>{{ $t(category.label.code) }}</nuxt-link
				>
			</div>
			<div class="informations">
				<div class="category-item">
					<span class="header-information">{{ $t('forums_threads') }}</span>
					<p>587</p>
				</div>
				<div class="category-item">
					<span class="header-information">Messages</span>
					<p>587</p>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'CategoriesContainer',
	props: ['category'],
}
</script>

<style lang="scss" scoped>
@import '~public/scss/modules/variables.scss';

.forum-category {
	display: flex;
	justify-content: space-between;
	align-items: center;
	.label {
		a {
			margin-bottom: 0;
			color: $primary-color;
			text-decoration: none;
			&:hover {
				color: $secondary-color;
			}
		}
	}
	.informations {
		display: flex;

		.category-item {
			display: flex;
			flex-direction: column;
			justify-content: center;
			margin: 0 1rem;
			.header-information {
				font-weight: 700;
				color: $secondary-color;
			}
			p {
				font-weight: 500;
				margin: 0;
				text-align: center;
				color: $primary-color;
			}
		}
	}
}
</style>
