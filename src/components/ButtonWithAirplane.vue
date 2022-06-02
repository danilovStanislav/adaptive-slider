<template>
  <a :href="props.linkTo" class="page__content__link">
    {{ props.linkText }}
    <svg
      id="airplane"
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.1118 14.1764L19.0784 12.1767L10.9959 7.31117L10.9039 1.81194C10.89 0.982052 10.2089 0.32335 9.37904 0.33723C8.54916 0.351109 7.89046 1.03222 7.90434 1.8621L7.99631 7.36133L0.0810416 12.4944L0.114487 14.4941L8.07156 11.8607L8.16354 17.3599L6.1889 18.8932L6.21398 20.393L9.69677 19.3346L13.213 20.2759L13.1879 18.7761L11.1631 17.3098L11.0711 11.8105L19.1118 14.1764Z"
        fill="white"
      />
    </svg>
    <svg
      id="circle"
      width="200"
      height="200"
      viewBox="0 0 102 102"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
    >
      <circle cx="51" cy="51" r="50" stroke-dasharray="314.16" />
    </svg>
  </a>
</template>

<script setup>
const props = defineProps({
  linkText: { type: String, default: 'Перейти' },
  linkTo: String,
})
</script>

<style lang="sass" scoped>
.page__content__link
	width: 200px
	height: 200px
	display: flex
	align-items: center
	justify-content: center
	position: relative
	color: #fff
	font-weight: 700
	font-size: 14px
	text-transform: uppercase
	text-decoration: none
	text-align: center
	background: transparent
	border: 2px solid transparent
	border-radius: 50%
	z-index: 10

	&:hover
		text-decoration: underline

		#airplane
			animation: moveCircle 2s ease-in-out reverse

		#circle circle
			animation: moveTrack 1.9s ease-in-out

	@media screen and (max-width: $sm-screen)
		width: 110px
		height: 110px
		font-size: 12px
		color: $color-blue

	#airplane
		position: absolute
		transform: translateX(100px)

	#circle
		position: absolute
		top: 0
		left: 0
		stroke: rgba(255, 255, 255, .3)
		stroke-width: 1px
		transform: scale(1, -1)

		circle
			stroke-dashoffset: 40

@keyframes moveCircle
	from
		transform: rotate(0deg) translateX(100px)
	to
		transform: rotate(360deg) translateX(100px)

@keyframes moveTrack
	from
		stroke-dashoffset: 314.16
	to
		stroke-dashoffset: 40
</style>
