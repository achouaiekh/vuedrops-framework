<template>

    <div class="vd-carousel"
         tabindex="1"
         @keyup.38.39="carousel.next()"
         @keyup.37.40="carousel.previous()"
         @keyup.space="carousel.autoPlay(false)"
    >

        <div class="vd-carousel__screen">
            <div class="vd-carousel__track">
                <slot></slot>
            </div>
        </div>

        <nav class="vd-carousel__navigation">

            <a
                    @click="previous()"
                    href="#"
                    class="arrow-navigation arrow-navigation__previous">
                <--
            </a>

            <slot name="pagination">
                <pagination
                        class="pagination__dot pagination__dot--hop white--text"
                        ref="pagination"
                        :shown-pages="paginationShownPage"
                        cycle
                        chevron
                        :class="paginationClass"
                ></pagination>
            </slot>

            <a
                    @click="next()"
                    href="#"
                    class="arrow-navigation  arrow-navigation__next">
                -->
            </a>
        </nav>


    </div>

</template>


<script>

    import Carousel from './Carousel'
    import props from './props'

    export default {

        name: 'carousel',

        data() {
            return {
                carousel: null,
            }
        },

        props,

        methods: {
            next() {
                this.carousel.next()
            },

            goto(to) {
                this.carousel.goto(to)
            },

            previous() {
                this.carousel.previous()
            }

        },


        mounted() {
            console.log(this)
            this.carousel = new Carousel(this)
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

    .vd-carousel

        outline: none
        position: relative
        display: block
        max-width: 100%

        .vd-carousel__screen
            overflow: hidden
            position: relative
            display: block
            width: 100%

        .slide
            box-sizing border-box
            padding .1em
            img
                height 100%
                width auto

    &.vd-carousel--fade, &.vd-carousel--vertical
        .slide
            width 100%
            img
                height auto
                width 100%

    &.vd-carousel--fade
        .slide
            position absolute
    .vd-carousel__track
        cursor pointer
        display: block
        position: relative
        top: 0
        left: 0

        &.grab
            cursor: grab

        &.grabbing
            cursor: grabbing

    .vd-carousel__navigation
        display: flex
        justify-content: center

        .nav
            text-decoration: none
            color: coral
            &:hover, &:focus
                color: cornflowerblue

</style>
