<template>
	<div class="post-create-section">
		<ForumBanner />
		<div class="container">
			<div class="card p-3">
				<div class="card-body">
					<div class="formulaire">
						<h2 class="ml-3">{{ form.title || 'Titre du post' }}</h2>
						<div class="form-group">
							<label for="title">Intitulé de votre message</label>
							<input
								type="text"
								name="title"
								class="form-control"
								v-model="form.label"
							/>
						</div>
						<div class="form-group">
							<label for="description">Contenu de votre message</label>
							<client-only>
								<editor
									ref="editor"
									:options="editorOptions"
									:initialValue="form.description"
									initialEditType="wysiwyg"
									mode="wysiwyg"
									@change="onEditorChange"
								/>
							</client-only>
						</div>
						<button class="btn btn-primary" @click.prevent="handleSubmit">
							Envoyer mon post
						</button>
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
				label: '',
				description: '',
			},
			editorOptions: {
				minHeight: '200px',
				language: 'de-FR',
				useCommandShortcut: true,
				useDefaultHTMLSanitizer: true,
				usageStatistics: false,
				hideModeSwitch: false,
				hideModeSwitch: true,
				toolbarItems: [
					'heading',
					'bold',
					'italic',
					'strike',
					'hr',
					'quote',
					'ul',
					'ol',
					'task',
					'indent',
					'outdent',
					'divider',
					'table',
					'image',
					'link',
					'code',
					'codeblock',
				],
			},
		}
	},
	methods: {
		async onEditorChange() {
			this.form.description = this.$refs.editor.invoke('getMarkdown')
		},
		async handleSubmit() {
			console.log({
				...this.form,
				categoryId: this.$route.params.categoryid,
				userId: this.$auth.user.id,
			})
			try {
				const { data } = this.$axios.post('/posts/', {
					...this.form,
					categoryId: +this.$route.params.categoryid,
					userId: +this.$auth.user.id,
				})
				this.$toast.success('La discussion a été créée')
				this.$router.push('')
			} catch (error) {
				error.response.data.errors.forEach((error) => {
					this.$toast.error(error.message)
				})
			}
		},
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
