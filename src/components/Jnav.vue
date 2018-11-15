<template>
	<section>
		<ul class="Jnav">
			<li v-if="!item.hidden" v-for="(item,index) in $router.options.routes">
				<router-link :to="item.path">{{item.label}}</router-link>
			</li>
		</ul>
	</section>
</template>

<script>
	export default {
		name: 'Jnav',
		data() {
			return {}
		},
		methods: {

		},
		watch: {

		},
		mounted() {

		}
	}
</script>

<style lang="scss" scoped>
	.Jnav {
		color: #666;
		font-size: .89em;
		margin-left: 20px;
		display:block;
		margin: 0;
		padding: 0;
		float: left;
		margin-left: 20px;
		li {
			display: block;
			float: left;
			margin-right: 0;
			list-style: none;
			float: left;
			margin-right: 43px;
			a {
				border-right: 1px solid #DEE3E7;
				padding: 0 20px;
				color: #666;
				font-size: .89em;
				&:hover {
					color: #217DBB;
				}
				&.active {
					font-weight: bold;
					color: #1F9AA5;
				}
				&.router-link-active {
					font-weight: bold;
					color: #1F9AA5;
					text-decoration: none;
				}
			}
		}
		li:last-child {
			a {
				border-right: none;
			}
		}
	}
</style>