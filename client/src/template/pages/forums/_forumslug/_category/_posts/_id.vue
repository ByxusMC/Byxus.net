<template>
	<div class="forum-section">
		<div class="container">
			<div class="d-flex justify-content-between">
				<h1>POST name</h1>
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
						<div v-for="(y, index) in 1" :key="index">
							<div class="forum-category">
								<div class="label">
									<h3 class="h6 no-styling">
										<i class="icon-comment-dots"></i>
										Catégorie 1
									</h3>
								</div>
								<div class="informations">
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
		</div>
	</div>
</template>

<script>
import { RolesGuard } from '~/utils'
import axios from 'axios'
import AxiosConfig from '../../../../../../../config/Axios'

export default {
	layout: 'forum',
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
	},
	async mounted() {
		const { data: m } = await this.$axios.get('/modules/2')

		this.module = m.module
		this.loading = false
	},

	async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
		const { data } = await axios.get(AxiosConfig.baseURL + '/posts/' + params.id)
		console.log(data)
		return { post: data }
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
