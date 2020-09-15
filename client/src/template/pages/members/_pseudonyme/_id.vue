<template>
	<div class="profil-section">
		<div class="container">
			<div class="container show-sm mb-5">
				<h1 class="display-4" :aria-label="user.pseudonyme + '\'s profil'">
					{{ user.pseudonyme }}
				</h1>
				<div class="badge-container">
					<div
						v-for="(role, key) in user.roles"
						class="badge"
						:style="'color: white; background-color:' + role.color"
						:key="key"
					>
						{{ $t(role.label.code) }}
					</div>
				</div>
			</div>
			<div class="avatar">
				<img :src="`http://cravatar.eu/helmavatar/${user.uuid}/${256}.png`" alt="avatar" />
				<div class="badge-container hide-sm">
					<div
						v-for="(role, key) in user.roles"
						class="badge"
						:style="'color: white; background-color:' + role.color"
						:key="key"
					>
						{{ $t(role.label.code) }}
					</div>
				</div>
			</div>

			<div class="data">
				<div class="container">
					<div class="d-flex w-100 justify-content-between">
						<h1 class="hide-sm mb-5" :aria-label="user.pseudonyme + '\'s profil'">
							{{ user.pseudonyme }}
						</h1>
						<div class="actions">
							<div class="btn-group" role="group" aria-label="Basic example">
								<template v-if="hasRole('update')">
									<button
										v-if="user.is_ban"
										type="button"
										class="btn btn-danger"
										@click.prevent="handleSwitchBan"
									>
										{{ $t('players_is_ban') }}
									</button>
									<button
										v-else
										type="button"
										class="btn btn-success"
										@click.prevent="handleSwitchBan"
									>
										{{ $t('players_is_unban') }}
									</button>
								</template>
								<button type="button" class="btn btn-secondary">Middle</button>
								<button type="button" class="btn btn-secondary">Right</button>
							</div>
						</div>
					</div>
					<div class="data-item">
						<h2 class="h4">UUID</h2>
						<div class="card">
							<div class="card-body">{{ user.uuid }}</div>
						</div>
					</div>
					<div class="data-item">
						<h2 class="h4">Email</h2>
						<div class="card">
							<div class="card-body">{{ user.email }}</div>
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
			loading: true,
			module: {
				create: [],
				update: [],
				destroy: [],
			},
			user: {},
		}
	},
	methods: {
		hasRole(action) {
			return RolesGuard.firewall(this.$auth.user, this.module, action)
		},
		async handleSwitchBan() {
			try {
				this.user = { ...this.user, is_ban: !this.user.is_ban }

				await this.$axios.put('/users/' + this.user.id, { is_ban: this.user.is_ban })
				const status = this.user.is_ban ? this.$t('players_is_ban') : this.$t('players_is_unban')
				this.$toast.success(`
					${this.user.pseudonyme}
					${this.$t('is_now')}
					${this.user.is_ban ? this.$t('players_is_ban') : this.$t('players_is_unban')}`)
			} catch (error) {
				const { errors } = error.data.response
				if (errors.length != 0) {
					errors.forEach((error) => {
						this.$toast.error(error.message)
					})
				}
			}
		},
	},
	async mounted() {
		const { data: u } = await this.$axios.get('/users/' + this.$route.params.id)
		const { data: m } = await this.$axios.get('/modules/1')
		this.user = u.user
		this.module = m.module
		this.loading = false
	},
}
</script>

<style lang="scss" scoped>
.profil-section {
	padding: 3rem 0;
	.container {
		display: flex;
		flex-wrap: wrap;
		.avatar {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			@media screen and (min-width: 576px) {
				order: 1;
				width: 33%;
				align-items: flex-start;
				flex-wrap: wrap;
			}
			@media screen and (min-width: 1400px) {
				padding: 0 2rem;
			}
			img {
				width: 128px;
				height: 128px;
				border-radius: 12px;
				@media screen and (min-width: 1400px) {
					width: 200px;
					height: 200px;
				}
			}
			.badge-container {
				@media screen and (min-width: 576px) {
					width: 100%;
					margin-top: -5rem;
				}
				@media screen and (min-width: 1400px) {
					margin-top: 2rem;
				}
			}
		}
		.data {
			width: 100%;
			margin-top: 2rem;
			@media screen and (min-width: 576px) {
				order: 2;
				width: 67%;
			}
			.container {
				.data-item {
					width: 100%;
					.card {
						margin-bottom: 1rem;
						width: inherit;
						p {
							vertical-align: middle;
						}
					}
				}
			}
		}
	}
}
.badge-container {
	width: 100%;
	display: flex;
	flex-wrap: wrap;
	.badge {
		margin: 3px;
		padding: 5px 8px;
		border-radius: 24px;
		width: fit-content;
		@media screen and (min-width: 1400px) {
			padding: 5px 10px;
			font-size: 18px;
		}
	}
}
</style>
