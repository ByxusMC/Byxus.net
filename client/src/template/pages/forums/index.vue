<template>
	<div class="forum-section">
		<ForumBanner />
		<div class="container pt-4">
			<div class="d-flex">
				<div
					v-if="hasRole('create') || hasRole('update') || hasRole('destroy')"
					class="actions"
				>
					<button type="button" class="btn btn-secondary" v-b-modal.new-forum>
						<i class="icon-plus" style="color: white"></i> Créer un forum
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
						@onCreateCategorie="handleCreateCategorie"
						:roles="filteredRoles"
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
		<ForumModalCreate :form="form" :roles="filteredRoles" @onSubmit="handleCreate" />
	</div>
</template>

<script>
import ForumBannerVue from '~/components/forum/ForumBanner'
import ForumContainerVue from '~/components/forum/ForumContainer'
import ForumNotFoundVue from '~/components/forum/ForumNotFound'
import ForumModalCreateVue from '~/components/forum/ForumModalCreate'
import { RolesGuard, I18N } from '~/utils'
import axios from 'axios'

export default {
	layout: 'forum',
	data() {
		return {
			module: {
				create: [],
				update: [],
				destroy: [],
			},
			forums: [],
			roles: [],
			filteredRoles: [],
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
			if (this.$auth.loggedIn) {
				return RolesGuard.firewall(this.$auth.user, this.module, action)
			}
			return false
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
		async handleCreateCategorie(forumId, form) {
			try {
				const { data: label } = await this.$axios.post('/translations', form.label)
				const { data: slug } = await this.$axios.post('/translations', form.slug)

				const { data } = await this.$axios.post('/categories', {
					...form,
					forumId,
					label: label.id,
					slug: slug.id,
				})
				this.updateTranslations([label, slug])
				this.getForums()

				this.$toast.success(`La catégorie a été créé`)
				this.$bvModal.hide('create-categories-' + forumId)
			} catch (error) {
				console.log(error.response)
				error.response.data.errors.forEach((error) => {
					this.$toast.error(error.message)
				})
			}
		},
		async handleEdit(forum) {
			const { id, label_id, slug_id, roles } = forum
			let array = []
			roles.forEach((role) => (array = [...array, role.id]))

			try {
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
	},
	async mounted() {
		this.loading = false
		let array = []

		const heightRole = RolesGuard.heightRole(this.$auth.user.roles)
		this.roles.forEach((role) => {
			if (role.power <= heightRole.power) {
				array = [...array, role]
			}
		})
		this.filteredRoles = array
		this.$emit('displayName', 'Forums byxus.fr')
	},

	async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
		const axiosConfig = { withCredentials: true }
		const { data: forums } = await axios.get('http://localhost:3333/api/forums', axiosConfig)
		const { data: module } = await axios.get('http://localhost:3333/api/modules/2', axiosConfig)
		const { data: roles } = await axios.get('http://localhost:3333/api/roles', axiosConfig)

		return {
			forums,
			module: module.module,
			roles,
		}
	},

	components: {
		ForumContainer: ForumContainerVue,
		ForumNotFound: ForumNotFoundVue,
		ForumModalCreate: ForumModalCreateVue,
		ForumBanner: ForumBannerVue,
	},
}
</script>

<style lang="scss" scoped>
.forum-section {
	.forum-card {
		margin: 2rem 0;
	}
}
</style>
