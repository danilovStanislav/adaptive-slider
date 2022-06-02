<template>
  <section
    class="slide"
    :style="{
      background: darkBackgroundImage,
    }"
  >
    <main class="slide__content">
      <h1 class="slide__title">{{ title }}</h1>
      <p class="slide__description">{{ description }}</p>
      <MqResponsive target="sm+">
        <ButtonWithAirplane
          :linkText="'Читать подробнее'"
          :linkTo="props.linkTo"
        />
      </MqResponsive>
    </main>
  </section>
</template>

<script setup>
import ButtonWithAirplane from '@/components/ButtonWithAirplane.vue'
import { computed } from 'vue'
import { MqResponsive } from 'vue3-mq'

const props = defineProps({
  bgImage: { type: String, default: 'none' },
  title: String,
  description: String,
  linkTo: String,
})

const darkBackgroundImage = computed(() => {
  let grad = 'linear-gradient(0deg, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4))'
  let bg = `url(${require(`@/assets/${props.bgImage}`)})`
  return `${grad}, ${bg} no-repeat center`
})
</script>

<style lang="sass" scoped>
.slide
	width: 100%
	padding: 144px 75px 100px
	background-size: cover !important

	@media screen and (max-width: $md-screen)
		padding: 80px 40px

	@media screen and (max-width: $sm-screen)
		padding: 0 15px
		background: none !important

.slide__content
	@include container

.slide__title
	max-width: 980px
	margin-top: 0
	margin-bottom: 50px
	font-family: 'Nexa'
	font-weight: 700
	font-size: 70px
	line-height: 1
	color: #fff

	@media screen and (max-width: $md-screen)
		font-size: 50px

	@media screen and (max-width: $sm-screen)
		margin-bottom: 14px
		color: $color-black
		font-size: 28px

.slide__description
	max-width: 740px
	margin-top: 0
	margin-bottom: 50px
	font-size: 20px
	line-height: 140%
	color: #fff

	@media screen and (max-width: $md-screen)
		font-size: 18px

	@media screen and (max-width: $sm-screen)
		margin-bottom: 19px
		color: $color-black
		font-size: 14px
</style>
