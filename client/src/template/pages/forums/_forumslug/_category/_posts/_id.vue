<template>
	<div class="forum-section">
		<ForumBanner />
		<div class="container">
			<div class="posts-container">
				<div v-for="(n, key) in 15" class="posts" :key="key">
					<div class="avatar">
						<img
							v-if="post.user.uuid"
							:src="`http://cravatar.eu/helmavatar/${post.user.uuid}/${256}.png`"
							class="img-fluid"
							alt=""
						/>
						<img
							v-else
							src="https://via.placeholder.com/128x128"
							class="img-fluid"
							alt=""
						/>
					</div>
					<div class="content">
						<div class="content-header">
							<div class="pseudonyme">
								{{ post.user.pseudonyme }}
								<span
									class="badge"
									:style="'background-color:' + getMaxRole.color"
									:key="key"
								>
									{{ $t(getMaxRole.label.code) }}
								</span>
							</div>
							<div class="lasted">
								{{ formatHours(post.created_at) }}
							</div>
						</div>
						<div class="content-body">
							<p>
								Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis
								dignissimos delectus eum ut unde aperiam dolorum vel velit numquam
								voluptatibus quo reprehenderit culpa recusandae iusto eligendi magni
								maiores, pariatur aut? Lorem ipsum dolor sit amet consectetur
								adipisicing elit. Quis dignissimos delectus eum ut unde aperiam
								dolorum vel velit numquam voluptatibus quo reprehenderit culpa
								recusandae iusto eligendi magni maiores, pariatur aut?
							</p>
						</div>
					</div>
				</div>
				<hr />
			</div>
			<div class="statistics">a</div>
		</div>
	</div>
</template>

<script>
import { RolesGuard } from '~/utils'
import axios from 'axios'
import AxiosConfig from '../../../../../../../config/Axios'
import ForumBannerVue from '~/components/forum/ForumBanner'
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
	methods: {
		hasRole(action) {
			return RolesGuard.firewall(this.$auth.user, this.module, action)
		},
		formatHours(date) {
			let final = ''
			moment.locale('fr')
			final = moment(date, 'YYYYMMDD').fromNow()
			return final
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
			.posts {
				padding: 2rem 0;
				width: 100%;
				display: flex;
				flex-wrap: nowrap;
				.avatar {
					width: 64px;
					img {
						width: 256px;
						border-radius: 12px;
					}
				}
				.content {
					padding: 0 2rem;
					display: flex;
					flex-direction: column;
					width: calc(100% - 64px);
					.content-header {
						padding: 0 0 1rem 0;
						display: flex;
						justify-content: space-between;
						.pseudonyme {
							font-weight: 600;
							font-size: 18px;
							color: $primary-color;
							.badge {
								color: white;
								font-size: 2px;
								text-transform: uppercase;
								padding: 0.1rem;
							}
						}
					}
					.content-body {
						p {
							letter-spacing: 0.5px;
							line-height: 1.5rem;
						}
					}
				}
				&:first-child {
					// background: green;
					padding-top: 0;
					padding-bottom: 1rem;

					position: relative;
					&::before {
						content: '';
						position: absolute;
						bottom: 0;
						left: 50%;
						transform: translateX(-50%);
						width: 90%;
						height: 1px;
						background: rgba(0, 0, 0, 0.1);
					}
				}
			}
		}
		.statistics {
			width: 25%;
			background: red;
		}
	}
}
</style>
