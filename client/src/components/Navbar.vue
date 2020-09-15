<template>
	<b-navbar toggleable="md" sticky>
		<b-navbar-brand href="#">ByxusMC</b-navbar-brand>
		<div class="online-players btn btn-secondary font-weight-500 letter-spacing-1">{{ $t('players_online') }} : 5</div>

		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav>
				<li class="nav-item" :class="{ active: this.$route.path == '/' }">
					<nuxt-link to="/" href="#" class="text-uppercase font-weight-500 letter-spacing-1">Accueil</nuxt-link>
				</li>
				<li class="nav-item">
					<nuxt-link to="/" href="#" class="text-uppercase font-weight-500 letter-spacing-1">Forum</nuxt-link>
				</li>
				<li class="nav-item">
					<nuxt-link to="/" href="#" class="text-uppercase font-weight-500 letter-spacing-1">Nos jeux</nuxt-link>
				</li>
				<li class="nav-item" :class="{ active: this.$route.path.split('/')[1] == 'members' }">
					<nuxt-link to="/" href="#" class="text-uppercase font-weight-500 letter-spacing-1">Statistiques</nuxt-link>
				</li>
			</b-navbar-nav>

			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown style="padding: 0" v-if="$auth.loggedIn" right>
					<template v-slot:button-content>
						<span class="text-uppercase font-weight-500 letter-spacing-1 pr-2" style="color: white">{{ $auth.user.pseudonyme }}</span>
						<b-avatar v-if="$auth.user.uuid" square rounded :src="`http://cravatar.eu/helmavatar/${$auth.user.uuid}/${128}.png`" alt="avatar"></b-avatar>
						<b-avatar v-else square rounded alt="avatar"></b-avatar>
					</template>
					<div class="dropdown-item">
						<nuxt-link :to="`/members/${this.$auth.user.pseudonyme}/${this.$auth.user.id}`">Mon profil</nuxt-link>
					</div>
					<b-dropdown-item @click="handleLogout">Se déconnecter</b-dropdown-item>
				</b-nav-item-dropdown>
				<nuxt-link v-else to="/authentication/login" class="btn btn-secondary">Connexion</nuxt-link>
			</b-navbar-nav>
		</b-collapse>
	</b-navbar>
</template>

<script>
export default {
	name: 'Navbar',
	methods: {
		handleLogout: async function () {
			await this.$auth.logout()
			await this.$router.push('/')
		},
	},
	mounted() {},
}
</script>

<style lang="scss" scoped>
@import '~public/scss/modules/variables';

.custom-input-group {
	margin-bottom: 10px !important;
}
.b-avatar {
	margin-right: 10px;
	border-radius: 4px !important;
}
.navbar {
	height: 70px;
	background-color: $primary-color;
	@media screen and (min-width: 576px) {
		padding: 0 10%;
		.online-players {
			display: none;
		}
	}
	.navbar-brand {
		color: white;
		@media screen and (min-width: 576px) {
			display: none;
		}
	}
	.navbar-nav:first-child {
		.nav-item {
			margin: 0 1rem;
			position: relative;
			transition: 0.3s all;
			a {
				color: white;
				text-decoration: none;
			}
			&.active {
				&::before {
					content: '';
					position: absolute;
					bottom: -25px;
					left: 50%;
					transform: translateX(-50%);
					width: 120%;
					border-bottom: 5px solid $secondary-color;
				}
			}
			&:hover {
				&::before {
					content: '';
					position: absolute;
					bottom: -25px;
					left: 50%;
					transform: translateX(-50%);
					width: 120%;
					border-bottom: 5px solid $secondary-color;
				}
			}
		}
	}
}
</style>
