<template>
	<div class="profil-section">
		<div class="container">
			<div class="container show-sm mb-5">
				<h1 class="display-4" :aria-label="user.pseudonyme + '\'s profil'">{{ user.pseudonyme }}</h1>
				<div class="badge-container">
					<div v-for="(role, key) in user.roles" class="badge" :style="'color: white; background-color:' + role.color" :key="key">{{ $t(role.label.code) }}</div>
				</div>
			</div>
			<div class="avatar">
				<img :src="`http://cravatar.eu/helmavatar/${user.uuid}/${128}.png`" alt="avatar" />
			</div>
			<div class="data">
				<div class="container">
					<h1 class="hide-sm mb-5" :aria-label="user.pseudonyme + '\'s profil'">{{ user.pseudonyme }}</h1>
					<div class="data-item">
						<h2 class="h4">UUID</h2>
						<div class="card">
							<div class="card-body">
								{{ user.uuid }}
							</div>
						</div>
					</div>
					<div class="data-item">
						<h2 class="h4">Email</h2>
						<div class="card">
							<div class="card-body">
								{{ user.email }}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	layout: 'master',
	data() {
		return {
			loading: true,
			user: {},
		}
	},
	async mounted() {
		const { data } = await this.$axios.get('/users/' + this.$route.params.id)
		this.user = data.user
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
		.badge-container {
			width: 100%;
			.badge {
				margin: 3px;
				padding: 5px 8px;
				border-radius: 24px;
			}
		}
		.avatar {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			img {
				width: 128px;
				height: 128px;
			}
		}
		.data {
			width: 100%;
			margin-top: 2rem;
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
</style>
