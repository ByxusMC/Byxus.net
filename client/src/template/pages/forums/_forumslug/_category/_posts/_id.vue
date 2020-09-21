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
				<div v-else class="btn btn-secondary">Répondre</div>
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
	</div>
</template>

<script>
import { RolesGuard } from '~/utils'
import axios from 'axios'
import AxiosConfig from '../../../../../../../config/Axios'
import ForumBannerVue from '~/components/forum/ForumBanner'
import PostContainerVue from '~/components/forum/PostContainer'
import CommentsContainerVue from '~/components/forum/CommentsContainer'
import moment from 'moment'

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
