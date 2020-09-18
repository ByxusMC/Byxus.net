<template>
	<div class="forum-section">
		<div class="container">
			<div class="d-flex justify-content-between">
				<h1>{{ $t(category.label.code) }}</h1>
				<div
					v-if="hasRole('create') || hasRole('update') || hasRole('destroy')"
					class="actions"
				>
					<button type="button" class="btn btn-secondary">
						<i class="icon-plus" style="color: white"></i>
					</button>
				</div>
			</div>
			<div class="forum-card card">
				<div class="card-body">
					<div class="container">
						<div v-for="(post, key) in category.posts" :key="key">
							<div class="forum-category">
								<div class="label">
									<nuxt-link :to="formatSlug(post)" class="h6 no-styling">
										<i class="icon-comment-dots"></i>
										{{ post.label }}
									</nuxt-link>
								</div>
								<div class="informations">
									<div class="category-item">
										<span class="header-information">Messages</span>
										<p>{{ post.comments.length }}</p>
									</div>
								</div>
							</div>
							<hr />
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { RolesGuard } from '~/utils'
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
	padding: 2rem 0;
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
