<template>
  <header class="header">
    <a class="header-logo" href="#">
      <img class="header-logo__icon" src="@/assets/logo.svg" alt="Logo" />
    </a>
    <NavbarList :navigationList="navigationList" />
    <a href="tel:+70000000000" class="header__phone">+7 (000) 000-00-00</a>
    <div
      class="burger-menu"
      :class="{
        'burger-menu_open': isBurgerMenuOpened,
      }"
    >
      <NavbarList :navigationList="navigationList" />
      <div class="burger-menu__contacts">
        <a
          href="tel:+70000000000"
          class="burger-menu__link burger-menu__link_phone"
        >
          <svg
            class="burger-menu__link__icon"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M17.01 12.38C15.78 12.38 14.59 12.18 13.48 11.82C13.13 11.7 12.74 11.79 12.47 12.06L10.9 14.03C8.07 12.68 5.42 10.13 4.01 7.2L5.96 5.54C6.23 5.26 6.31 4.87 6.2 4.52C5.83 3.41 5.64 2.22 5.64 0.99C5.64 0.45 5.19 0 4.65 0H1.19C0.65 0 0 0.24 0 0.99C0 10.28 7.73 18 17.01 18C17.72 18 18 17.37 18 16.82V13.37C18 12.83 17.55 12.38 17.01 12.38Z"
              fill="#0055A4"
            />
          </svg>
          +7 (000) 000-00-00</a
        >
        <a
          href="mailto:Example@mail.ru"
          class="burger-menu__link burger-menu__link_email"
        >
          <svg
            class="burger-menu__link__icon"
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18 0H2C0.9 0 0.00999999 0.9 0.00999999 2L0 14C0 15.1 0.9 16 2 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H2V4L10 9L18 4V14ZM10 7L2 2H18L10 7Z"
              fill="#0055A4"
            />
          </svg>
          Example@mail.ru</a
        >
      </div>
    </div>
    <button
      class="burger-menu-button"
			:class="{ 'burger-menu-button_active': isBurgerMenuOpened }"
      @click="isBurgerMenuOpened = !isBurgerMenuOpened"
    >
      <svg
        id="burger"
				width="29"
				height="29"
        viewBox="0 0 29 29"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect y="12" width="29" height="2" rx="1" fill="#313131" />
        <rect y="18" width="29" height="2" rx="1" fill="#313131" />
      </svg>
    </button>
  </header>
</template>

<script setup>
import NavbarList from '@/components/NavbarList.vue'
import { ref, onMounted } from 'vue'
import axios from 'axios'

const navigationList = ref([])
const isBurgerMenuOpened = ref(false)

onMounted(async () => {
  const res = await axios.get(
    'https://admin.skytech.choosedesign.ru/wp-json/basic/navigation'
  )
  navigationList.value = res.data
})
</script>

<style lang="sass" scoped>
.header
	@include container
	width: 100%
	padding: 22px 15px
	display: flex
	align-items: center
	justify-content: space-between
	z-index: 100
	background-color: #fff

	@media screen and (max-width: $sm-screen)
		padding-top: 10px
		padding-bottom: 10px
		margin-bottom: 10px
		position: fixed
		top: 0
		left: 0

		&:deep .navbar__list
			display: none

.header-logo
	margin-right: 10px
	display: flex
	align-items: center

	@media screen and (max-width: $sm-screen)
		margin-right: 0

	.header-logo__icon
		width: 230px

		@media screen and (max-width: $sm-screen)
			width: 125px

.header__phone
	margin-left: 10px
	text-decoration: none
	font-weight: 700
	font-size: 20px
	text-align: right
	color: $color-blue
	transition: all .3s ease

	&:hover
		box-shadow: 0 1px 0 0 $color-blue

	@media screen and (max-width: $lg-screen)
		display: none

.burger-menu
	width: 100%
	height: calc(100% - 50px)
	padding: 50px 15px 22px
	display: flex
	flex-direction: column
	position: fixed
	top: 50px
	right: -100%
	background-color: #fff
	z-index: 150
	overflow-y: scroll
	transition: right .3s ease

	&:deep .navbar__list
		margin-bottom: 15px
		display: flex
		flex-grow: 1
		flex-direction: column
		align-items: flex-start
		justify-content: unset

	&:deep .navbar__item
		padding-left: 0
		padding-right: 0

		&:not(:last-child)
			margin-bottom: 28px

	&:deep .navbar__link
		font-family: 'Nexa', sans-serif
		font-size: 29px
		line-height: 110%
		font-weight: 700

	.burger-menu__link
		display: flex
		align-items: center
		font-family: 'Inter', sans-serif
		font-size: 16px
		color: $color-blue
		text-decoration: none

		&:not(:last-child)
			margin-bottom: 10px

		.burger-menu__link__icon
			margin-right: 10px

	.burger-menu__link_phone
		font-weight: 700

.burger-menu_open
	right: 0

.burger-menu-button
	padding: 0
	display: none
	background-color: transparent
	border: none
	cursor: pointer

	@media screen and (max-width: $sm-screen)
		display: block

#burger rect
	transition: transform 0.2s

.burger-menu-button_active rect:nth-of-type(1)
	transform: rotate(45deg)
	transform-origin: 9px 12px

.burger-menu-button_active rect:nth-of-type(2)
	transform: rotate(-45deg)
	transform-origin: 10px 21px
</style>
