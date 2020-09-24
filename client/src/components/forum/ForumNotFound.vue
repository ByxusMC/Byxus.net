<template>
	<div class="forum-card card">
		<div class="card-body">
			<div class="d-flex justify-content-between">
				<p v-if="canCreate" class="h6 no-styling m-0">
					Aucun forum n'a été trouvé 😥 Créez votre premier forum en cliquant
					<span
						id="create-modal"
						class="font-weight-bold text-secondary"
						style="cursor: pointer"
						v-b-modal="'new-forum'"
					>
						ici
					</span>
				</p>
				<h2 v-else class="h6 no-styling m-0">Aucun forum n'a été trouvé 😥</h2>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ForumNotFound',
	props: ['canCreate'],
}
</script>

<style lang="scss" scoped></style>
