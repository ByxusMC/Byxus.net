<template>
	<div class="forum-section">
		<div class="container">
			<div class="d-flex justify-content-between">
				<h1>Forums byxus.fr</h1>
				<div v-if="hasRole('create') || hasRole('update') || hasRole('destroy')" class="actions">
					<button type="button" class="btn btn-secondary" v-b-modal.new-forum>
						<i class="icon-plus" style="color: white"></i>
					</button>
				</div>
			</div>
			<template v-if="forums.length != 0">
				<div v-for="(forum, key) in forums" class="forum-card card" :key="key">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<h2 class="no-styling">
								<i class="icon-comments-alt"></i>
								{{ $t(forum.label.code) }}
							</h2>
							<div v-if="hasRole('update')" class="actions">
								<div class="btn-group" role="group" aria-label="Basic example">
									<button type="button" class="btn btn-info btn-sm" @click="$bvModal.show('edit-forum-' + key)">
										<i class="icon-edit text-white"></i>
									</button>
									<button type="button" class="btn btn-primary btn-sm">
										<i class="icon-plus text-white"></i>
									</button>
									<button type="button" class="btn btn-danger btn-sm" @click="$bvModal.show('delete-confirm-' + key)">
										<i class="icon-ban text-white"></i>
									</button>
								</div>
							</div>
						</div>
						<b-modal class="delete-confirm" :id="'delete-confirm-' + key">
							<template v-slot:modal-title>Confirmation de suppression</template>
							<div class="my-2">Vous êtes sur le point de supprimer un forum, êtes-vous sûr de vouloir le faire ?</div>
							<template v-slot:modal-footer>
								<div class="float-right">
									<b-button variant="primary" size="sm" @click.prevent="handleDelete(forum.id, key), $bvModal.hide('delete-confirm-' + key)">Oui je le veux</b-button>
								</div>
							</template>
						</b-modal>
						<b-modal class="edit-forum" :id="'edit-forum-' + key">
							<template v-slot:modal-title>Edition du forum</template>
							<div class="my-2">
								<div class="row">
									<div class="col-md-6">
										<div class="form-group label">
											<label for="label-fr">Nom du forum (FR)</label>
											<input type="text" name="label-fr" class="form-control" v-model="forums[key].label.fr" />
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group label">
											<label for="label-en">Nom du forum (EN)</label>
											<input type="text" name="label-en" class="form-control" v-model="forums[key].label.en" />
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-6">
										<div class="form-group label">
											<label for="slug-fr">Affichage dans l'URL (FR)</label>
											<input type="text" name="slug-fr" class="form-control" v-model="forums[key].slug.fr" />
										</div>
									</div>
									<div class="col-md-6">
										<div class="form-group label">
											<label for="slug-en">Affichage dans l'URL (EN)</label>
											<input type="text" name="slug-en" class="form-control" v-model="forums[key].slug.en" />
										</div>
									</div>
								</div>
								<div class="row">
									<div class="col-md-12">
										<div class="form-group label">
											<label for="slug-fr">Affichage dans l'URL (FR)</label>
											<v-select :options="roles" label="label.power" v-model="forums[key].roles" :getOptionLabel="({ label }) => $t(label.code)" multiple>
												<template #option="{ label }">{{ $t(label.code) }}</template>
											</v-select>
										</div>
									</div>
								</div>
							</div>
							<template v-slot:modal-footer>
								<div class="w-100">
									<b-button variant="primary" size="sm" class="float-right" @click.prevent="handleEdit(forum.id, key)">Valider</b-button>
								</div>
							</template>
						</b-modal>
						<hr />
						<div class="container">
							<div v-for="(category, index) in forum.categories" :key="index">
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
							</div>
						</div>
					</div>
				</div>
			</template>
			<template v-else>
				<div class="forum-card card">
					<div class="card-body">
						<div class="d-flex justify-content-between">
							<h2 class="h6 no-styling m-0">
								Aucun forum n'a été trouvé 😥
								<span v-if="hasRole('update')">
									Créez votre premier forum en cliquant
									<span class="font-weight-bold text-secondary" style="cursor: pointer" v-b-modal.new-forum>ici</span>
								</span>
							</h2>
						</div>
					</div>
				</div>
			</template>
		</div>
		<b-modal class="new-forum" id="new-forum">
			<template v-slot:modal-title>Nouveau forum</template>
			<div class="my-2">
				<div class="row">
					<div class="col-md-6">
						<div class="form-group label">
							<label for="label-fr">Nom du forum (FR)</label>
							<input type="text" name="label-fr" class="form-control" v-model="form.label.fr" />
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group label">
							<label for="label-en">Nom du forum (EN)</label>
							<input type="text" name="label-en" class="form-control" v-model="form.label.en" />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-6">
						<div class="form-group label">
							<label for="slug-fr">Affichage dans l'URL (FR)</label>
							<input type="text" name="slug-fr" class="form-control" v-model="form.slug.fr" />
						</div>
					</div>
					<div class="col-md-6">
						<div class="form-group label">
							<label for="slug-en">Affichage dans l'URL (EN)</label>
							<input type="text" name="slug-en" class="form-control" v-model="form.slug.en" />
						</div>
					</div>
				</div>
				<div class="row">
					<div class="col-md-12">
						<div class="form-group label">
							<label for="slug-fr">Affichage dans l'URL (FR)</label>
							<v-select :options="roles" label="label.power" v-model="form.roles" :reduce="(role) => role.id" :getOptionLabel="({ label }) => $t(label.code)" multiple>
								<template #option="{ label }">{{ $t(label.code) }}</template>
							</v-select>
						</div>
					</div>
				</div>
			</div>
			<template v-slot:modal-footer>
				<div class="w-100">
					<b-button variant="primary" size="sm" class="float-right" @click.prevent="handleCreate">Valider</b-button>
				</div>
			</template>
		</b-modal>
	</div>
</template>

<script>
import { RolesGuard, I18N } from '~/utils'
import 'vue-select/dist/vue-select.css'
import VSelect from 'vue-select'
import { log } from 'util'

export default {
	layout: 'master',
	data() {
		return {
			module: {
				create: [],
				update: [],
				destroy: [],
			},
			forums: [],
			roles: [],
			form: {
				slug: {
					fr: '',
					en: '',
				},
				label: {
					fr: '',
					en: '',
				},
			},
		}
	},
	methods: {
		hasRole(action) {
			return RolesGuard.firewall(this.$auth.user, this.module, action)
		},
		async handleCreate() {
			try {
				const { data: label } = await this.$axios.post('/translations', this.form.label)
				const { data: slug } = await this.$axios.post('/translations', this.form.slug)
				const { data } = await this.$axios.post('/forums', { ...this.form, label: label.id, slug: slug.id })

				this.updateTranslations([label, slug])
				this.getForums()

				this.$toast.success(`Le forum a été créé`)
				this.$bvModal.hide('new-forum')
				this.form = { slug: { fr: '', en: '' }, label: { fr: '', en: '' }, roles: [] }
			} catch (error) {
				error.response.data.errors.forEach((error) => {
					this.$toast.error(error.message)
				})
			}
		},
		async handleEdit(id, key) {
			const { label_id, slug_id, roles } = this.forums[key]
			let array = []

			try {
				roles.forEach((role) => (array = [...array, role.id]))
				await this.$axios.put('/translations/' + label_id, this.forums[key].label)
				await this.$axios.put('/translations/' + slug_id, this.forums[key].slug)

				const { data } = await this.$axios.put('/forums/' + id, { ...this.forums[key], roles: array })
				this.$toast.success(data.message)
				this.$bvModal.hide('edit-forum-' + key)
			} catch (error) {
				error.response.data.errors.forEach((error) => this.$toast.error(error.message))
			}
		},
		async handleDelete(id, key) {
			const { data } = await this.$axios.delete('/forums/' + id)
			this.forums.splice(key, 1)
			this.$toast.success(data.message)
		},
		updateTranslations(items) {
			items.forEach((item) => {
				const { code, fr, en } = item
				I18N.upateTranslations(this.$i18n, 'fr', [code], fr)
				I18N.upateTranslations(this.$i18n, 'en', [code], en)
			})
		},
		async getForums() {
			const { data } = await this.$axios.get('/forums')
			this.forums = data
		},
		async getModule() {
			const { data } = await this.$axios.get('/modules/2')
			this.module = data.module
		},
		async getRoles() {
			const { data } = await this.$axios.get('/roles')
			this.roles = data
		},
	},
	async mounted() {
		this.getForums()
		this.getModule()
		this.getRoles()

		this.loading = false
	},

	components: { 'v-select': VSelect },
}
</script>

<style lang="scss" scoped>
@import '~public/scss/modules/variables.scss';

.forum-section {
	padding: 2rem 0;
	.forum-card {
		margin: 2rem 0;
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
	}
}
</style>
