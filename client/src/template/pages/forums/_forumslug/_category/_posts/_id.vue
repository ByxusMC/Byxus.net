<template>
	<div class="forum-section">
		<ForumBanner />
		<div class="container">
			<div class="posts-container">
				<PostContainer :post="post" />
				<CommentsContainer
					v-for="(comment, key) in post.comments"
					:comment="comment"
					:key="key"
					:index="key"
					@onUpdate="handleUpdate"
				/>
			</div>
			<div class="statistics">
				<nuxt-link
					to="/authentication/login"
					v-if="!$auth.loggedIn"
					class="btn btn-secondary"
				>
					Connectez-vous pour répondre
				</nuxt-link>
				<div v-else class="btn btn-secondary" @click="$bvModal.show('new-comment')">
					Répondre
				</div>
				<div class="item">
					<div>{{ post.comments.length }}</div>
					<i class="icon-comments-alt"></i>
				</div>
				<div v-if="post.is_resolved == 1" class="item">
					<div>Résolu</div>
					<i class="icon-check-circle"></i>
				</div>
				<div class="item">
					<div>Non résolu</div>
					<i class="icon-ban"></i>
				</div>
			</div>
		</div>
		<CommentsModalCreate @onCreate="handleCreate" />
	</div>
</template>

<script>
import { RolesGuard } from '~/utils'
import axios from 'axios'
import AxiosConfig from '../../../../../../../config/Axios'
import ForumBannerVue from '~/components/forum/ForumBanner'
import PostContainerVue from '~/components/forum/PostContainer'
import CommentsContainerVue from '~/components/forum/CommentsContainer'
import CommentsModalCreateVue from '~/components/forum/CommentsModalCreate'

export default {
	layout: 'forum',
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
		async handleCreate(form) {
			try {
				await this.$axios.post('/comments', {
					...form,
					userId: this.$auth.user.id,
					postId: this.post.id,
				})
				const { data } = await axios.get(AxiosConfig.baseURL + '/posts/' + this.post.id)
				this.post = data
				this.$toast.success('Le commentaire a bien été ajouté ✔')
			} catch (error) {
				error.response.data.errors.forEach((error) => {
					this.$toast.error(error.message)
				})
			}
		},
		async handleUpdate(comment) {
			try {
				await this.$axios.put('/comments/' + comment.id, {
					...form,
					userId: this.$auth.user.id,
					postId: this.post.id,
				})
				this.$toast.success('Le commentaire a bien été modifié ✔')
			} catch (error) {
				error.response.data.errors.forEach((error) => {
					this.$toast.error(error.message)
				})
			}
		},
	},

	async mounted() {
		const { data: m } = await this.$axios.get('/modules/2')

		this.module = m.module
		this.loading = false
	},

	computed: {
		getMaxRole() {
			return RolesGuard.heightRole(this.post.user.roles)
		},
	},

	async asyncData({ isDev, route, store, env, params, query, req, res, redirect, error }) {
		const { data } = await axios.get(AxiosConfig.baseURL + '/posts/' + params.id)
		return { post: data }
	},
	components: {
		ForumBanner: ForumBannerVue,
		PostContainer: PostContainerVue,
		CommentsContainer: CommentsContainerVue,
		CommentsModalCreate: CommentsModalCreateVue,
	},
}
</script>

<style lang="scss" scoped>
@import '~public/scss/modules/variables.scss';

.forum-section {
	background: white;
	min-height: 100vh;
	.container {
		padding: 2rem 0 0 0;
		display: flex;
		.posts-container {
			display: flex;
			flex-direction: column;
			width: 75%;
			justify-content: center;
		}
		.statistics {
			display: flex;
			flex-direction: column;
			width: 25%;
			// background: red;
			.btn {
				margin-left: auto;
				margin-bottom: 1rem;
			}
			.item {
				justify-self: flex-end;
				text-align: right;
				display: flex;
				flex-wrap: nowrap;
				justify-content: flex-end;
				align-items: center;
				&:first-child {
					margin-top: 1rem;
				}
				div {
					margin-right: 10px;
					font-size: 18px;
				}
				i {
					font-size: 18px;
				}
			}
		}
	}
}
</style>
