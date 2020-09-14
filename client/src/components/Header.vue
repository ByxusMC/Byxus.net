<template>
	<header>
		<img src="~public/images/header-background.png" class="header-background" alt="" />
		<div class="header-items">
			<div class="item-logo">
				<img src="~public/images/logo.png" class="logo" alt="" />
			</div>
			<div class="item-counter">
				<div class="btn-group" role="group" aria-label="Basic example">
					<div class="btn btn-primary text-uppercase font-weight-500 letter-spacing-1">{{ $t('players_online') }} : 5</div>
					<div class="btn btn-secondary text-uppercase font-weight-500 letter-spacing-1">play.byxus.fr</div>
				</div>
			</div>
			<div class="item-socials">
				<div class="container">
					<a href="" aria-label="youtube-link" class="icon icon-circle"><i class="icon-youtube"></i></a>
					<a href="" aria-label="twitter-link" class="icon icon-circle"><i class="icon-twitter"></i></a>
					<a href="" aria-label="discord-link" class="icon icon-circle"><i class="icon-discord"></i></a>
				</div>
			</div>
		</div>
	</header>
</template>

<script>
export default {
	name: 'Header',
}
</script>

<style lang="scss" scoped>
header {
	max-height: 15vh;
	height: 15vh;
	overflow: hidden;
	position: relative;
	@media screen and (min-width: 576px) {
		max-height: 25vh;
		height: 25vh;
	}
	@media screen and (min-width: 1400px) {
		max-height: 30vh;
		height: 30vh;
	}
	.header {
		&-background {
			width: 100%;
			height: 100%;
			filter: brightness(60%);
		}
		&-items {
			position: absolute;
			top: 0;
			left: 0;
			width: 100vw;
			height: 100%;
			display: flex;
			flex-wrap: nowrap;
			justify-content: center;
			.item-logo {
				display: flex;
				justify-content: center;
				align-items: center;
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 50%;
				@media screen and (min-width: 576px) {
					position: initial;
					top: 0;
					left: 0;
					transform: translate(0);
					order: 1;
					width: auto;
					height: 100%;
					width: 100%;
				}
				@media screen and (min-width: 1400px) {
					position: initial;
					top: 0;
					left: 0;
					transform: translate(0);
					order: 2;
					width: auto;
					height: 100%;
					width: 33.33%;
				}
				img {
					width: 100%;
					@media screen and (min-width: 576px) {
						width: 80%;
					}
					@media screen and (min-width: 1400px) {
						width: 60%;
					}
				}
			}
			.item-counter {
				display: none;
				@media screen and (min-width: 576px) {
					display: flex;
					justify-content: left;
					align-items: center;
					order: 2;
					width: 100%;
				}
				@media screen and (min-width: 1400px) {
					display: flex;
					justify-content: center;
					align-items: center;
					order: 1;
					width: 33.33%;
				}
			}
			.item-socials {
				display: none;
				@media screen and (min-width: 1400px) {
					display: flex;
					justify-content: center;
					align-items: center;
					order: 3;
					width: 33.33%;
				}
				.container {
					max-width: 50%;
					display: flex;
					justify-content: space-between;
					align-items: center;

					a {
						i {
							font-size: 32px;
						}
					}
				}
			}
		}
	}
}
</style>
