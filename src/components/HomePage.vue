<template>
  <swiper
    class="slider-main"
    @swiper="onMainSwiper"
    @slideChange="setActiveIndex"
    :modules="[EffectFade, Controller]"
    :controller="{ control: thumbsSwiper }"
    :allow-touch-move="false"
    effect="fade"
    :fadeEffect="{ crossFade: true }"
    :rewind="true"
  >
    <SwiperSlide v-for="slide of slides" :key="slide.id">
      <SlideContent
        :bgImage="slide.image"
        :title="slide.title"
        :description="slide.description"
        :linkTo="slide.link"
      />
    </SwiperSlide>
  </swiper>

  <div class="slider-thumb-wrapper">
    <swiper
      class="slider-thumb"
      @swiper="onThumbsSwiper"
      :modules="[Controller]"
      :controller="{ control: mainSwiper }"
      :breakpoints="breakpoints"
      :rewind="true"
    >
      <SwiperSlide
        v-for="(slide, i) of slides"
        :key="slide.id"
        @click="clickOnThumbSlide(i)"
      >
        <div
          class="slider-thumb__element"
          :class="{
            'slider-thumb__element_active': activeSlideIndex === i,
          }"
        >
          <img
            class="slider-thumb__image"
            :src="require(`@/assets/${slide.thumb}`)"
            alt="Slide image"
          />
          <MqResponsive target="sm+">
            <SlideInterval
              v-if="activeSlideIndex === i && autoPlay"
              :time="slideShowDuration"
              @intervalFinished="intervalFinished"
            />
          </MqResponsive>
        </div>
      </SwiperSlide>
    </swiper>
    <div class="slider-thumb__pagination-wrapper">
      <span
        class="slider-thumb__pagination-bullet"
        :class="{
          'slider-thumb__pagination-bullet_active': index === activeSlideIndex,
        }"
        v-for="(bullet, index) in slides.length"
        :key="index"
      ></span>
    </div>
    <a href="#" class="page__link">Читать подробнее</a>
  </div>
</template>

<script setup>
import SlideContent from '@/components/SlideContent.vue'
import SlideInterval from '@/components/SlideInterval.vue'
import slides from '../../public/slides.json'
import { ref, computed, onMounted, watch } from 'vue'
import { MqResponsive } from 'vue3-mq'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { EffectFade, Controller } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-fade'

const slideShowDuration = 5 // Seconds
const activeSlideIndex = ref(0)
const mainSwiper = ref(null)
const thumbsSwiper = ref(null)
const autoPlay = ref(true)
const breakpoints = {
  321: { slidesPerView: 1, spaceBetween: 0 },
  651: { slidesPerView: 2, spaceBetween: 20 },
  769: { slidesPerView: 3, spaceBetween: 40 },
}

const onMainSwiper = (swiper) => (mainSwiper.value = swiper)
const onThumbsSwiper = (swiper) => (thumbsSwiper.value = swiper)
const setActiveIndex = (swiper) => (activeSlideIndex.value = swiper.activeIndex)

const clickOnThumbSlide = (index) => {
  autoPlay.value = false
  mainSwiper.value.slideTo(index, 700)
}

const intervalFinished = () => mainSwiper.value.slideNext(1500)
</script>

<style lang="sass">
.slider-main
	z-index: 0

	@media screen and (max-width: $sm-screen)
		padding-top: 50px

.slider-thumb-wrapper
	@include container
	padding: 0 10px
	transform: translateY(-50%)
	z-index: 10
	position: relative

	@media screen and (max-width: $md-screen)
		transform: translateY(0)

	@media screen and (max-width: $sm-screen)
		padding: 0

.slider-thumb
	max-width: 860px
	margin-right: 0

.slider-thumb__element
	height: 165px
	border-radius: 10px
	border: 2px solid transparent
	cursor: pointer
	overflow: hidden
	position: relative
	background-repeat: no-repeat
	background-position: center
	background-size: cover

	@media screen and (max-width: $sm-screen)
		width: 100%
		height: auto
		border-radius: 0
		border: none

	&::before
		width: 100%
		height: 100%
		content: ''
		position: absolute
		top: 0
		left: 0
		display: block
		background: rgba(0, 0, 0, .5)
		transition: background .15s ease-in-out

		@media screen and (max-width: $sm-screen)
			display: none

.slider-thumb__element_active
	border-color: $color-pale-blue

	&::before
		background: none

.slider-thumb__image
	width: 100%
	height: 165px
	object-fit: cover
	object-position: center
	z-index: 1000

	@media screen and (max-width: $sm-screen)
		height: 235px

.slider-thumb__pagination-wrapper
	max-width: 230px
	padding: 0 15px
	margin-top: 10px
	display: none
	align-items: center

	@media screen and (max-width: $sm-screen)
		display: flex

.slider-thumb__pagination-bullet
	width: 41px
	height: 4px
	display: inline-block
	border-radius: 3px
	background-color: $color-pale-blue

	&:not(:last-child)
		margin-right: 7px

.slider-thumb__pagination-bullet_active
	background-color: $color-blue

.page__link
	width: 110px
	height: 110px
	display: none
	align-items: center
	justify-content: center
	position: absolute
	bottom: -30px
	right: 15px
	z-index: 150
	text-align: center
	color: $color-blue
	text-transform: uppercase
	text-decoration: none
	font-weight: 700
	font-size: 12px
	background-color: #f4f8fa
	border-radius: 50%
	border: 2px solid $color-pale-blue

	&:hover
		background-color: #fff

	@media screen and (max-width: $sm-screen)
		display: flex
</style>
