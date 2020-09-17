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
import axios from 'axios'

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
	},
}
</script>

<style lang="scss" scoped>
.forum-section {
	padding: 2rem 0;
	.forum-card {
		margin: 2rem 0;
	}
}
</style>
