<template>
  <div class="interval">
    <div class="interval__content">
      <span>
        {{ intervalDuration }} <br />
        сек
      </span>
      <svg
        id="svg"
        width="60"
        height="60"
        viewBox="0 0 120 120"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          r="56"
          cx="60"
          cy="60"
          fill="none"
          stroke-dasharray="11 7"
        ></circle>
        <circle
          id="bar"
          r="56"
          cx="60"
          cy="60"
          fill="none"
          stroke-dasharray="377"
        ></circle>
      </svg>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch, computed } from 'vue'
const props = defineProps({ time: Number })
const emits = defineEmits(['intervalFinished'])

const interval = ref(null)
const intervalDuration = ref(null)

onMounted(() => {
  intervalDuration.value = props.time
  startInterval(interval.value)
})
onUnmounted(() => stopInterval(interval.value))

const animationDuration = computed(() => `${props.time}s`)

const startInterval = (instance) => {
  instance = setInterval(() => {
    intervalDuration.value--
  }, 1000)
}

const stopInterval = (instance) => clearInterval(instance)

watch(intervalDuration, (newVal) => {
  if (newVal === 0) {
    stopInterval(interval.value)
    emits('intervalFinished')
  }
})
</script>

<style lang="sass" scoped>
.interval
	width: 60px
	height: 60px
	display: flex
	align-items: center
	justify-content: center
	position: absolute
	top: 50%
	left: 50%
	transform: translate(-50%, -50%)
	border-radius: 50%

	.interval__content
		position: relative
		color: #fff
		font-family: 'Roboto'
		font-size: 17px
		font-weight: 500
		text-align: center
		z-index: 100
		line-height: 80%

#svg
	position: absolute
	top: 50%
	left: 50%
	transform: translate(-50%, -50%)

#svg circle
	stroke: #fff
	stroke-width: 7px

#svg #bar
	stroke: #fff
	stroke-width: 7px
	animation-name: moveBar
	animation-duration: v-bind('animationDuration')
	animation-timing-function: linear

@keyframes moveBar
	from
		stroke-dashoffset: 0
	to
		stroke-dashoffset: 377
</style>
