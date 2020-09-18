<template>
	<div class="py-3 d-flex justify-content-between">
		<p class="h6 no-styling m-0">
			Aucun post n'a été trouvé 😥 Créez le premier post de cette catégorie en cliquant
			<nuxt-link
				:to="`/forums/${$t(category.forum.slug.code)}/${$t(
					category.slug.code
				)}/posts/create`"
				>ici</nuxt-link
			>
		</p>
	</div>
</template>

<script>
export default {
	name: 'CategoriesNotFound',
	props: ['category'],
}
</script>

<style lang="scss" scoped></style>
