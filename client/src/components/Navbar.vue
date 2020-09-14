<template>
	<b-navbar toggleable="md" sticky>
		<b-navbar-brand href="#">ByxusMC</b-navbar-brand>
		<div class="online-players btn btn-secondary font-weight-500 letter-spacing-1">{{ $t('players_online') }} : 5</div>

		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav>
				<b-nav-item>
					<nuxt-link to="/" href="#" class="text-uppercase font-weight-500 letter-spacing-1 active">Accueil</nuxt-link>
				</b-nav-item>
				<b-nav-item>
					<nuxt-link to="/" href="#" class="text-uppercase font-weight-500 letter-spacing-1 active">Forum</nuxt-link>
				</b-nav-item>
				<b-nav-item>
					<nuxt-link to="/" href="#" class="text-uppercase font-weight-500 letter-spacing-1 active">Nos jeux</nuxt-link>
				</b-nav-item>
				<b-nav-item>
					<nuxt-link to="/" href="#" class="text-uppercase font-weight-500 letter-spacing-1 active">Statistiques</nuxt-link>
				</b-nav-item>
			</b-navbar-nav>

			<b-navbar-nav class="ml-auto">
				<b-nav-item-dropdown v-if="this.$auth.loggedIn" right>
					<template v-slot:button-content>
						<b-avatar></b-avatar>
						{{ $auth.user.pseudonyme }}
					</template>
					<b-dropdown-item href="#">Mon profil</b-dropdown-item>
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
}
</script>

<style lang="scss" scoped>
@import '~public/scss/modules/variables';

.custom-input-group {
	margin-bottom: 10px !important;
}
.b-avatar {
	margin-right: 10px;
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
	.navbar-nav {
		.nav-item {
			margin: 0 1rem;
			a {
				color: white;
			}
			&.active {
				position: relative;
				&::before {
					content: '';
					position: absolute;
					bottom: -18px;
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
