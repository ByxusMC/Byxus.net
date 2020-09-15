<template>
	<div class="profil-section">
		<div class="container">
			<div class="container show-sm mb-5">
				<h1 class="display-4" :aria-label="user.pseudonyme + '\'s profil'">{{ user.pseudonyme }}</h1>
				<div class="badge-container">
					<div v-for="(role, key) in user.roles" class="badge" :style="'color: white; background-color:' + role.color" :key="key">{{ $t(role.label.code) }}</div>
				</div>
				<div v-if="hasRole('update')" class="button-add-roles">
					<button class="btn btn-primary" @click.prevent="buttonRolesAdd = !buttonRolesAdd">
						<i class="icon-plus"></i>
					</button>
					<div class="card roles-list" :class="{ active: buttonRolesAdd }">
						<div class="card-body">
							<p v-for="(role, key) in roles" :value="role.id" :key="key" @click="handleAddRole(role.id)">{{ $t(role.label.code) }}</p>
						</div>
					</div>
				</div>
			</div>
			<div class="avatar">
				<img :src="`http://cravatar.eu/helmavatar/${user.uuid}/${256}.png`" alt="avatar" />
				<div class="badge-container hide-sm">
					<div v-for="(role, key) in user.roles" class="badge" :style="'color: white; background-color:' + role.color" :key="key">{{ $t(role.label.code) }}</div>
				</div>
				<div v-if="hasRole('update')" class="button-add-roles hide-sm">
					<button class="btn btn-primary" @click.prevent="buttonRolesAdd = !buttonRolesAdd">
						<i class="icon-plus"></i>
					</button>
					<div class="card roles-list" :class="{ active: buttonRolesAdd }">
						<div class="card-body">
							<p v-for="(role, key) in roles" :value="role.id" :key="key" @click="handleAddRole(role.id)">{{ $t(role.label.code) }}</p>
						</div>
					</div>
				</div>
			</div>

			<div class="data">
				<div class="container">
					<div class="d-flex w-100 justify-content-between">
						<h1 class="hide-sm mb-5" :aria-label="user.pseudonyme + '\'s profil'">{{ user.pseudonyme }}</h1>
						<div v-if="hasRole('update')" class="actions">
							<div class="btn-group" role="group" aria-label="Basic example">
								<button v-if="user.is_ban" type="button" class="btn btn-danger" @click.prevent="handleSwitchBan">{{ $t('players_is_ban') }}</button>
								<button v-else type="button" class="btn btn-success" @click.prevent="handleSwitchBan">{{ $t('players_is_unban') }}</button>
								<button type="button" class="btn btn-secondary">Middle</button>
								<button type="button" class="btn btn-secondary">Right</button>
							</div>
						</div>
					</div>
					<div class="data-item">
						<h2 class="h4 no-styling">UUID</h2>
						<div class="card">
							<div class="card-body">{{ user.uuid }}</div>
						</div>
					</div>
					<div class="data-item">
						<h2 class="h4 no-styling">Email</h2>
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
			user: {},
			roles: [],
			currentRoles: [],
			module: {
				create: [],
				update: [],
				destroy: [],
			},
			buttonRolesAdd: false,
		}
	},
	methods: {
		hasRole(action) {
			return RolesGuard.firewall(this.$auth.user, this.module, action)
		},
		async handleAddRole(id) {
			if (this.currentRoles.includes(id)) {
				const index = this.currentRoles.indexOf(id)
				this.currentRoles.splice(index, 1)
				this.user.roles.splice(index, 1)
			} else {
				this.currentRoles.push(id)
				this.user.roles.push(this.roles.find((role) => role.id == id))
			}
			this.buttonRolesAdd = false

			try {
				console.log('{ roles: this.currentRoles }', { roles: this.currentRoles || [] })
				await this.$axios.put('/users/' + this.user.id, { roles: this.currentRoles })
				this.$toast.success(this.$t('roles_update'))
			} catch (error) {
				const { errors } = error.response.data
				if (errors.length != 0) {
					errors.forEach((error) => {
						this.$toast.error(error.message)
					})
				}
			}
		},
		async handleSwitchBan() {
			try {
				this.user = { ...this.user, is_ban: !this.user.is_ban }
				let array = []
				this.user.roles.forEach((role) => array.push(role.id))

				await this.$axios.put('/users/' + this.user.id, { is_ban: this.user.is_ban })
				const status = this.user.is_ban ? this.$t('players_is_ban') : this.$t('players_is_unban')
				this.$toast.success(`
					${this.user.pseudonyme}
					${this.$t('is_now')}
					${this.user.is_ban ? this.$t('players_is_ban') : this.$t('players_is_unban')}`)
			} catch (error) {
				const { errors } = error.response.data
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
		const { data: r } = await this.$axios.get('/roles')
		const { data: m } = await this.$axios.get('/modules/1')

		let array = []
		u.user.roles.forEach((role) => array.push(role.id))

		this.user = u.user
		this.roles = r.roles
		this.currentRoles = array
		this.module = m.module
		this.loading = false
	},
}
</script>

<style lang="scss" scoped>
@import '~public/scss/modules/variables.scss';

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
				justify-content: flex-start;
			}
			img {
				width: 128px;
				height: 128px;
				border-radius: 12px;
				@media screen and (min-width: 1400px) {
					width: 256px;
					height: 256px;
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
	width: 80%;
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
.button-add-roles {
	position: relative;
	display: flex;
	width: 20%;
	align-self: center;
	justify-content: right;
	@media screen and (min-width: 1400px) {
		width: fit-content;
		margin-top: 2rem;
	}
	.btn {
		width: 32px;
		height: 32px;
		i {
			color: white;
		}
	}
	.roles-list {
		display: none;
		max-width: 150px;
		max-height: 250px;
		overflow-y: scroll;
		background: white;
		p {
			width: 100%;
			cursor: pointer;
		}
		&.active {
			display: flex;
			flex-wrap: wrap;
			position: absolute;
			z-index: 999;
			top: 50px;
			right: 0;
			@media screen and (min-width: 1400px) {
				top: initial;
				left: 0;
				right: initial;
				bottom: 50px;
			}
		}
	}
}
</style>
