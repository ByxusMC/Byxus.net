<template>
	<div class="py-3 d-flex justify-content-between">
		<p v-if="canCreate" class="h6 no-styling m-0">
			Aucune catégorie n'a été trouvé 😥 Créez votre première catégorie en cliquant
			<span
				id="create-modal-categorie"
				class="font-weight-bold text-secondary"
				style="cursor: pointer"
				@click="$bvModal.show('create-categories-' + forum.id)"
			>
				ici
			</span>
		</p>
		<h2 v-else class="h6 no-styling m-0">Aucune catégorie n'a été trouvé 😥</h2>
	</div>
</template>

<script>
export default {
	name: 'CategoriesNotFound',
	props: ['forum', 'canCreate'],
}
</script>

<style lang="scss" scoped></style>
