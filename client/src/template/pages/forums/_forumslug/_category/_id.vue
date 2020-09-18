<template>
	<div class="forum-section">
		<ForumBanner />
		<div class="container py-3">
			<div class="d-flex justify-content-end">
				<div class="actions">
					<nuxt-link
						:to="`/forums/${$t(category.forum.slug.code)}/${$t(category.slug.code)}/${
							category.id
						}/post/create`"
						class="btn btn-primary"
						>Créer une discusssion</nuxt-link
					>
					<template v-if="hasRole('update') || hasRole('destroy')">
						<div class="btn-group" role="group" aria-label="Basic example">
							<button
								v-if="hasRole('update')"
								type="button"
								class="btn btn-primary btn-sm"
								@click="$bvModal.show('update-categories-' + category.id)"
							>
								<i class="icon-plus text-white"></i>
							</button>
							<button
								v-if="hasRole('destroy')"
								type="button"
								class="btn btn-danger btn-sm"
								@click="$bvModal.show('delete-confirm-' + forum.id)"
							>
								<i class="icon-ban text-white"></i>
							</button>
						</div>
					</template>
				</div>
			</div>
			<div class="forum-card card">
				<div class="card-body">
					<div class="container">
						<template v-if="category.posts.length != 0">
							<div v-for="(post, key) in category.posts" :key="key">
								<PostContainer :post="post" />
								<hr />
							</div>
						</template>
						<template v-else>
							<PostsNotFound :category="category" />
						</template>
					</div>
				</div>
			</div>
		</div>
		<CategoriesModalUpdate
			:category="category"
			:roles="filteredRoles"
			@onSubmit="handleUpdateCategory"
		/>
	</div>
</template>

<script>
import ForumBannerVue from '~/components/forum/ForumBanner'
import ForumLayoutVue from '~/template/layouts/forum'
import CategoriesModalUpdateVue from '~/components/forum/CategoriesModalUpdate'
import PostsContainerVue from '~/components/forum/PostsContainer'
import PostsNotFoundVue from '~/components/forum/PostsNotFound'
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
			filteredRoles: [],
		}
	},
	methods: {
		hasRole(action) {
			return RolesGuard.firewall(this.$auth.user, this.module, action)
		},
		formatSlug(post) {
			return `/forums/${this.$t(this.category.forum.slug.code)}/${this.$t(
				this.category.slug.code
			)}/${post.label.toLowerCase().replace(' ', '-').replace('?', '')}/${post.id}`
		},
		async handleUpdateCategory() {
			const { id, label_id, label, slug_id, slug, roles, forum } = this.category
			let array = []
			roles.forEach((role) => (array = [...array, role.id]))

			try {
				const { data: l } = await this.$axios.put('/translations/' + label_id, label)
				const { data: s } = await this.$axios.put('/translations/' + slug_id, slug)
				const { data } = await this.$axios.put('/categories/' + id, {
					roles: array,
					slugId: slug_id,
					labelId: label_id,
					forumId: forum.id,
				})

				this.updateTranslations([l, s])
				this.getCategory(id)
				this.$toast.success(data.message)
				this.$bvModal.hide('update-categories-' + id)
			} catch (error) {
				error.response.data.errors.forEach((error) => {
					this.$toast.error(error.message)
				})
			}
		},
		async handleCreatePost() {
			console.log(this.form, this.category.id, this.$auth.user.id)
		},

		async getCategory(id) {
			const { data } = await this.$axios.get('/categories/' + id)
			this.category = data

			console.log(this.category)
		},
		updateTranslations(items) {
			items.forEach((item) => {
				const { code, fr, en } = item
				I18N.upateTranslations(this.$i18n, 'fr', [code], fr)
				I18N.upateTranslations(this.$i18n, 'en', [code], en)
			})
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
	},

	components: {
		ForumBanner: ForumBannerVue,
		CategoriesModalUpdate: CategoriesModalUpdateVue,
		PostsContainer: PostsContainerVue,
		PostsNotFound: PostsNotFoundVue,
	},

	async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
		const axiosConfig = { withCredentials: true }
		const { data: category } = await axios.get(
			'http://localhost:3333/api/categories/' + params.id,
			axiosConfig
		)
		const { data: module } = await axios.get('http://localhost:3333/api/modules/2', axiosConfig)
		const { data: roles } = await axios.get('http://localhost:3333/api/roles', axiosConfig)

		return {
			category,
			module: module.module,
			roles,
		}
	},
}
</script>

<style lang="scss" scoped>
@import '~public/scss/modules/variables.scss';

.forum-section {
	.forum-card {
		margin: 2rem 0;
		.forum-category {
			display: flex;
			justify-content: space-between;
			align-items: center;
			.label {
				h3 {
					margin-bottom: 0;
					color: $primary-color;
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
