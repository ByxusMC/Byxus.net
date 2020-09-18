<template>
	<div class="post-create-section">
		<ForumBanner />
		<div class="container">
			<div class="card">
				<div class="card-body">
					<div class="formulaire">
						<h2 class="ml-3">{{ form.title || 'Titre du post' }}</h2>
						<div class="form-group">
							<label for="title">Intitulé de votre message</label>
							<input
								type="text"
								name="title"
								class="form-control"
								v-model="form.title"
							/>
						</div>
						<div class="form-group">
							<label for="description">Contenu de votre message</label>
							<textarea
								name="description"
								rows="10"
								class="form-control"
								v-model="form.description"
							></textarea>
						</div>
						<button class="btn btn-primary">Envoyer mon post</button>
					</div>
					<div class="informations px-3">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
							labore.
						</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import ForumBannerVue from '~/components/forum/ForumBanner'
export default {
	layout: 'forum',
	data() {
		return {
			form: {
				title: '',
				description: '',
			},
		}
	},
	components: {
		ForumBanner: ForumBannerVue,
	},
}
</script>

<style lang="scss" scoped>
.post-create-section {
	.container {
		display: flex;
		justify-content: center;
		.card {
			margin-top: 3rem;
			width: 100%;
			.card-body {
				display: flex;
			}
			.formulaire {
				width: 70%;
			}
			.informations {
				width: 30%;
			}
		}
	}
}
</style>
