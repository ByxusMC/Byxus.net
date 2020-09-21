<template>
	<div class="comments">
		<div class="avatar">
			<img
				v-if="comment.user.uuid"
				:src="`http://cravatar.eu/helmavatar/${comment.user.uuid}/${256}.png`"
				class="img-fluid"
				alt="avatar"
			/>
			<img v-else src="https://via.placeholder.com/128x128" class="img-fluid" alt="" />
		</div>
		<div class="content">
			<div class="content-header">
				<div class="pseudonyme">
					{{ comment.user.pseudonyme }}
					<span
						v-if="comment.user.roles.length != 0"
						class="badge"
						:style="'background-color:' + getMaxRole(comment.user.roles).color"
					>
						{{ $t(getMaxRole(comment.user.roles).label.code) }}
					</span>
				</div>
				<div class="lasted">
					{{ formatHours(comment.created_at) }}
					<template v-if="$auth.loggedIn && comment.user.id === $auth.user.id">
						<div
							class="btn btn-secondary"
							@click="$bvModal.show(`edit-comment-${index}-${comment.id}`)"
						>
							<i class="icon-edit"></i>
						</div>
					</template>
				</div>
			</div>
			<div class="content-body">
				<div v-html="$md.render(comment.message.replace(/<br>/g, '\n'))"></div>
			</div>
		</div>
		<CommentsModalUpdate :comment="comment" :index="index" @onCreate="handleUpdate" />
	</div>
</template>

<script>
import { RolesGuard } from '~/utils'
import moment from 'moment'
import CommentsModalCreateVue from '~/components/forum/CommentsModalCreate'
import CommentsModalUpdateVue from '~/components/forum/CommentsModalUpdate'

export default {
	name: 'CommentsContainer',
	props: ['comment', 'index'],
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
		handleUpdate() {
			this.$emit('onUpdate', this.comment)
		},
	},
	components: {
		CommentsModalCreate: CommentsModalCreateVue,
		CommentsModalUpdate: CommentsModalUpdateVue,
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
.comments {
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
			.lasted {
				.btn {
					margin-left: 1rem;
					position: relative;
					height: 30px;
					width: 30px;
					i {
						position: absolute;
						top: 50%;
						left: 56%;
						transform: translate(-50%, -50%);
						color: white;
					}
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
