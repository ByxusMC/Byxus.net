<template>
	<div class="categories-container">
		<!-- <div v-for="(category, index) in forum.categories" :key="index">
			<div class="forum-category">
				<div class="label">
					<i class="icon-comment-dots"></i>
					<nuxt-link :to="`/forums/${$t(forum.label.code)}/${$t(category.label.code)}/`" class="h6 no-styling">{{ $t(category.label.code) }}</nuxt-link>
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
			<hr />
		</div> -->
		Hello categories
	</div>
</template>

<script>
export default {
	name: 'CategoriesContainer',
}
</script>

<style lang="scss" scoped></style>
