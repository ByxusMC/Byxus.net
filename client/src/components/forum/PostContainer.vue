<template>
	<div class="posts">
		<div class="avatar">
			<img
				v-if="post.user.uuid"
				:src="`http://cravatar.eu/helmavatar/${post.user.uuid}/${256}.png`"
				class="img-fluid"
				alt=""
			/>
			<img v-else src="https://via.placeholder.com/128x128" class="img-fluid" alt="" />
		</div>
		<div class="content">
			<div class="content-header">
				<div class="pseudonyme">
					{{ post.user.pseudonyme }}
					<span
						class="badge"
						:style="'background-color:' + getMaxRole(post.user.roles).color"
					>
						{{ $t(getMaxRole(post.user.roles).label.code) }}
					</span>
				</div>
				<div class="lasted">
					{{ formatHours(post.created_at) }}
				</div>
			</div>
			<div class="content-body">
				<div v-html="$md.render(post.description.replace(/<br>/g, '\n'))"></div>
			</div>
		</div>
	</div>
</template>

<script>
import { RolesGuard } from '~/utils'
import moment from 'moment'
export default {
	name: 'PostContainer',
	props: ['post'],
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
		getMaxRole(roles) {
			return RolesGuard.heightRole(roles)
		},
	},
}
</script>

<style lang="scss" scoped>
@import '~public/scss/modules/variables.scss';
h1 {
	&::before {
		content: none !important;
	}
}
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
</style>
