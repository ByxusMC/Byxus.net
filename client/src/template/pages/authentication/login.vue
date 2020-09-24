<template>
	<div class="login-section">
		<div class="picture">
			<img src="~public/images/header-background.png" alt="" />
		</div>
		<div class="form">
			<div class="container">
				<div class="d-flex justify-content-between">
					<h1 class="display-4">Connexion</h1>
					<nuxt-link to="/" class="btn btn-primary align-self-center" style="width: 32px; height: 32px; position: relative">
						<i class="icon-home-alt1" style="color: white; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"></i>
					</nuxt-link>
				</div>
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio dolores fugit dicta earum esse distinctio ea atque. In, ratione vel?</p>
				<div class="form-group">
					<label>Email</label>
					<input type="text" class="form-control" v-model="form.email" />
				</div>
				<div class="form-group">
					<label>Mot de passe</label>
					<input type="password" class="form-control" v-model="form.password" />
				</div>
				<button class="btn btn-primary" @click.prevent="handleSubmit">Connexion</button>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			form: {
				email: '',
				password: '',
			},
		}
	},
	methods: {
		async handleSubmit() {
			try {
				const { data } = await this.$auth.loginWith('local', {
					data: {
						email: this.form.email,
						password: this.form.password,
						remember_me: this.form.remember_me,
					},
				})
				this.$toast.success(`Bienvenue ${data.user.pseudonyme} ! 👋`)
			} catch (error) {
				const { data } = error.response
				data.errors.map((e) => {
					this.$toast.error(error.response.status == 401 ? 'Les identifiants sont incorrectes' : e.message)
				})
			}
		},
	},
}
</script>

<style lang="scss" scoped>
.login-section {
	position: fixed;
	width: 100vw;
	height: 100vh;
	display: inline-flex;
	background-color: white;
	.picture {
		width: 50vw;
		img {
			width: 100%;
			height: 100vh;
		}
	}
	.form {
		width: 50vw;
		position: relative;
		.container {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 80%;
			h1 {
				text-align: left;
			}
			p {
				font-size: 16px;
			}
		}
	}
}
</style>
