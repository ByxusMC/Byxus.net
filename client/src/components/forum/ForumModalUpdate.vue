<template>
	<b-modal class="edit-forum" :id="'edit-forum-' + forum.id">
		<template v-slot:modal-title>Edition du forum</template>
		<div class="my-2">
			<div class="row">
				<div class="col-md-6">
					<div class="form-group label">
						<label for="label-fr">Nom du forum (FR)</label>
						<input
							type="text"
							name="label-fr"
							class="form-control"
							v-model="forum.label.fr"
						/>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group label">
						<label for="label-en">Nom du forum (EN)</label>
						<input
							type="text"
							name="label-en"
							class="form-control"
							v-model="forum.label.en"
						/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-6">
					<div class="form-group label">
						<label for="slug-fr">Affichage dans l'URL (FR)</label>
						<input
							type="text"
							name="slug-fr"
							class="form-control"
							v-model="forum.slug.fr"
						/>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group label">
						<label for="slug-en">Affichage dans l'URL (EN)</label>
						<input
							type="text"
							name="slug-en"
							class="form-control"
							v-model="forum.slug.en"
						/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group label">
						<label for="slug-fr"
							>Roles pouvant interagir avec le forum
							<span class="font-weight-bold">{{ $t(forum.label.code) }}</span></label
						>
						<v-select
							:options="roles"
							label="label.power"
							v-model="forum.roles"
							:getOptionLabel="({ label }) => $t(label.code)"
							multiple
						>
							<template #option="{ label }">{{ $t(label.code) }}</template>
						</v-select>
					</div>
				</div>
			</div>
		</div>
		<template v-slot:modal-footer>
			<div class="w-100">
				<b-button
					variant="primary"
					size="sm"
					class="float-right"
					@click.prevent="handleSubmit"
					>Valider</b-button
				>
			</div>
		</template>
	</b-modal>
</template>

<script>
import 'vue-select/dist/vue-select.css'
import VSelect from 'vue-select'
import { RolesGuard } from '~/utils'

export default {
	name: 'ForumModalUpdate',
	props: ['forum', 'roles'],
	methods: {
		handleSubmit() {
			this.$emit('onUpdate', this.forum)
		},
	},
	components: { 'v-select': VSelect },
}
</script>

<style lang="scss" scoped></style>
