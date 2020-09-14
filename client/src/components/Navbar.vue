<template>
	<b-navbar toggleable="lg" sticky>
		<b-navbar-brand href="#">ByxusMC</b-navbar-brand>
		<div class="online-players btn btn-secondary">Joueurs connectés : 5</div>

		<b-collapse id="nav-collapse" is-nav>
			<b-navbar-nav>
				<b-nav-item href="#">Accueil</b-nav-item>
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
				<b-button v-else @click.prevent="toggleModal" right>Connexion</b-button>
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
	}
}
</style>
