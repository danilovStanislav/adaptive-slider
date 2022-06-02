<template>
	<ul class="navbar__list">
		<li class="navbar__item" v-for="(link, i) in props.navigationList" :key="i">
			<a :href="link.url" class="navbar__link">{{ link.title }}</a>
		</li>
	</ul>
</template>

<script setup>
const props = defineProps({ navigationList: Array })
</script>

<style lang="sass" scoped>
.navbar__list
	max-width: 810px
	width: 100%
	padding-left: 0
	margin-top: 0
	margin-bottom: 0
	display: flex
	align-items: center
	justify-content: space-between
	flex-wrap: wrap
	list-style: none

	.navbar__item
		padding-left: 5px
		padding-right: 5px

	.navbar__link
		display: block
		font-size: 20px
		text-decoration: none
		color: $color-black
		line-height: 140%
		transition: all .3s ease

		&:hover
			color: $color-blue
			box-shadow: 0 1px 0 0 $color-blue

		@media screen and (max-width: $lg-screen)
			font-size: 18px
</style>
