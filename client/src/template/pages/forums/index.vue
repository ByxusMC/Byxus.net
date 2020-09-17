<template>
	<div class="forum-section">
		<div class="container">
			<div class="d-flex justify-content-between">
				<h1>Forums byxus.fr</h1>
				<div
					v-if="hasRole('create') || hasRole('update') || hasRole('destroy')"
					class="actions"
				>
					<button type="button" class="btn btn-secondary" v-b-modal.new-forum>
						<i class="icon-plus" style="color: white"></i>
					</button>
				</div>
			</div>
		</div>
		<template v-if="forums.length != 0">
			<div class="container">
				<template v-for="(forum, key) in forums">
					<ForumContainer
						:forum="forum"
						:canCreate="hasRole('create')"
						:canUpdate="hasRole('update')"
						:canDelete="hasRole('destroy')"
						@onUpdate="handleEdit"
						@onDelete="handleDelete"
						:roles="roles"
						:key="key"
						:index="key"
					/>
				</template>
			</div>
		</template>
		<template v-else>
			<div class="container">
				<ForumNotFound :canCreate="hasRole('create')" modalId="action-create-forum" />
			</div>
		</template>
		<ForumModalCreate :form="form" :roles="roles" @onSubmit="handleCreate" />
	</div>
</template>

<script>
import ForumContainerVue from '~/components/forum/ForumContainer'
import ForumNotFoundVue from '~/components/forum/ForumNotFound'
import ForumModalCreateVue from '~/components/forum/ForumModalCreate'
import { RolesGuard, I18N } from '~/utils'

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
				const { data } = await this.$axios.post('/forums', {
					...this.form,
					label: label.id,
					slug: slug.id,
				})

				this.updateTranslations([label, slug])
				this.getForums()

				this.$toast.success(`Le forum a été créé`)
				this.$bvModal.hide('new-forum')
				this.form = { slug: { fr: '', en: '' }, label: { fr: '', en: '' }, roles: [] }
			} catch (error) {
				console.log(error.response)
				error.response.data.errors.forEach((error) => {
					this.$toast.error(error.message)
				})
			}
		},
		async handleEdit(forum) {
			console.log(3)

			const { id, label_id, slug_id, roles } = forum
			let array = []

			try {
				roles.forEach((role) => (array = [...array, role.id]))
				await this.$axios.put('/translations/' + label_id, forum.label)
				await this.$axios.put('/translations/' + slug_id, forum.slug)

				const { data } = await this.$axios.put('/forums/' + id, {
					...forum,
					roles: array,
				})
				this.$toast.success(data.message)
				this.$bvModal.hide('edit-forum-' + forum.id)
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

	components: {
		ForumContainer: ForumContainerVue,
		ForumNotFound: ForumNotFoundVue,
		ForumModalCreate: ForumModalCreateVue,
	},
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
