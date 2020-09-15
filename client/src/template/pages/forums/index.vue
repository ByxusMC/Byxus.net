<template>
	<div class="forum-section">
		<div class="container">
			<div class="d-flex justify-content-between">
				<h1>Forums byxus.fr</h1>
				<div v-if="hasRole('create') || hasRole('update') || hasRole('destroy')" class="actions">
					<button type="button" class="btn btn-secondary">
						<i class="icon-plus" style="color: white"></i>
					</button>
				</div>
			</div>
			<div v-for="(n, key) in 5" class="forum-card card" :key="key">
				<div class="card-body">
					<div class="d-flex justify-content-between">
						<h2 class="no-styling">
							<i class="icon-comments-alt"></i>
							Forum {{ n }}
						</h2>
						<div v-if="hasRole('update')" class="actions">
							<button type="button" class="btn btn-secondary">Modifier le nom</button>
						</div>
					</div>
					<hr />
					<div class="container">
						<div v-for="(y, index) in 7" :key="index">
							<div class="forum-category">
								<div class="label">
									<h3 class="h6 no-styling">
										<i class="icon-comment-dots"></i>
										Catégorie 1
									</h3>
								</div>
								<div class="informations">
									<div class="category-item">
										<span class="header-information">Thread</span>
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
		</div>
	</div>
</template>

<script>
import { RolesGuard } from '~/utils'

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
	},
	async mounted() {
		const { data: r } = await this.$axios.get('/roles')
		const { data: m } = await this.$axios.get('/modules/2')

		this.roles = r.roles
		this.module = m.module
		this.loading = false
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
