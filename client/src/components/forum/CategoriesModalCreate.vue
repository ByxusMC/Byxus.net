<template>
	<b-modal class="new-forum" :id="'create-categories-' + forum.id">
		<template v-slot:modal-title>Nouvelle catégorie</template>
		<div class="my-2">
			<div class="row">
				<div class="col-md-6">
					<div class="form-group label">
						<label for="label-fr">Nom de la catégorie (FR)</label>
						<input
							type="text"
							name="label-fr"
							class="form-control"
							v-model="form.label.fr"
						/>
					</div>
				</div>
				<div class="col-md-6">
					<div class="form-group label">
						<label for="label-en">Nom de la catégorie (EN)</label>
						<input
							type="text"
							name="label-en"
							class="form-control"
							v-model="form.label.en"
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
							v-model="form.slug.fr"
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
							v-model="form.slug.en"
						/>
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col-md-12">
					<div class="form-group label">
						<label for="slug-fr">Affichage dans l'URL (FR)</label>
						<v-select
							:options="roles"
							label="label.power"
							v-model="form.roles"
							:reduce="(role) => role.id"
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

export default {
	name: 'CategoriesModalCreate',
	props: ['forum', 'roles'],
	data() {
		return {
			form: {
				label: {
					fr: '',
					en: '',
				},
				slug: {
					fr: '',
					en: '',
				},
				roles: [],
			},
		}
	},
	methods: {
		handleSubmit() {
			this.$emit('onSubmit', this.forum.id, this.form)
		},
	},
	components: { 'v-select': VSelect },
}
</script>

<style lang="scss" scoped></style>
