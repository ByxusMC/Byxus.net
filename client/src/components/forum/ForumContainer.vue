<template>
	<div class="forum-card card">
		<div class="card-body">
			<div class="d-flex justify-content-between">
				<h2 class="no-styling">
					<i class="icon-comments-alt"></i>
					{{ $t(forum.label.code) }}
				</h2>
				<div v-if="canCreate || canUpdate || canDelete" class="actions">
					<div class="btn-group" role="group" aria-label="Basic example">
						<button
							v-if="canUpdate"
							type="button"
							class="btn btn-info btn-sm"
							@click="$bvModal.show('edit-forum-' + forum.id)"
						>
							<i class="icon-edit text-white"></i>
						</button>
						<button
							v-if="canUpdate"
							type="button"
							class="btn btn-primary btn-sm"
							@click="$bvModal.show('create-categories-' + forum.id)"
						>
							<i class="icon-plus text-white"></i>
						</button>
						<button
							v-if="canDelete"
							type="button"
							class="btn btn-danger btn-sm"
							@click="$bvModal.show('delete-confirm-' + forum.id)"
						>
							<i class="icon-ban text-white"></i>
						</button>
					</div>
				</div>
			</div>
			<b-modal class="delete-confirm" :id="'delete-confirm-' + forum.id">
				<template v-slot:modal-title>Confirmation de suppression</template>
				<div class="my-2">
					Vous êtes sur le point de supprimer un forum, êtes-vous sûr de vouloir le faire
					?
				</div>
				<template v-slot:modal-footer>
					<div class="float-right">
						<b-button
							variant="primary"
							size="sm"
							@click.prevent="
								handleDeleteForum(forum.id, index),
									$bvModal.hide('delete-confirm-' + forum.id)
							"
							>Oui je le veux</b-button
						>
					</div>
				</template>
			</b-modal>
			<ForumModalUpdate :forum="forum" :roles="roles" @onUpdate="handleUpdateForum" />
			<CategoriesModalCreate
				:forum="forum"
				:roles="roles"
				@onSubmit="handleCreateCategorie"
			/>
			<hr />
			<div class="categories-container">
				<div v-for="(category, index) in forum.categories" :key="index">
					<CategoriesContainer :forum="forum" :category="category" />
					<hr />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import CategoriesContainerVue from './CategoriesContainer'
import ForumModalUpdateVue from './ForumModalUpdate'
import CategoriesModalCreateVue from './CategoriesModalCreate'
import { RolesGuard, I18N } from '~/utils'

export default {
	props: ['forum', 'forumUpdate', 'canCreate', 'canUpdate', 'canDelete', 'roles', 'index'],
	data() {
		return {}
	},
	methods: {
		handleUpdateForum(forum) {
			this.$emit('onUpdate', forum)
		},
		handleDeleteForum(id, index) {
			this.$emit('onDelete', id, index)
		},
		handleCreateCategorie(forumId, form) {
			this.$emit('onCreateCategorie', forumId, form)
		},
	},
	components: {
		CategoriesContainer: CategoriesContainerVue,
		ForumModalUpdate: ForumModalUpdateVue,
		CategoriesModalCreate: CategoriesModalCreateVue,
	},
}
</script>

<style lang="scss" scoped></style>
