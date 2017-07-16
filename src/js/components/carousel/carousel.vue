<template>

    <div class="vd-carousel"
         tabindex="1"
         @keyup.38.39="carousel.next()"
         @keyup.37.40="carousel.previous()"
         @keyup.space="carousel.autoPlay(false)"
    >

        <div class="screen">
            <div class="track">
                <slot></slot>
            </div>
        </div>

        <nav class="navigation">

            <a
                    @click="prev()"
                    href="#"
                    class="arrow-navigation arrow-navigation__previous">
                <--
            </a>

            <pagination
                    class="dot"
                    ref="pagination"
                    @nextPage="next"
                    @toPage="to"
                    @previousPage="prev"
                    :length="dots"
                    :shown-page ="paginationShownPage"
                    :class="paginationClass"
            ></pagination>

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
                dots: 0,
            }
        },

        props,

        methods: {

            mount(){
                this.carousel = new Carousel(this)
            },

            to(value){

                let v = (value - 1) * this.carousel.slideToScrollCount

                this.carousel.animate(v)
            },

            next(){
                return this.carousel.next()
            },

            prev(){
                this.carousel.previous()
            },

        },


        mounted() {
            this.mount()
        }

    }
</script>

<style lang="stylus" rel="stylesheet/stylus">

    .vd-carousel

        outline: none
        position: relative
        display: block
        max-width: 100%

        .screen
            overflow: hidden
            position: relative
            display: block
            width: 100%

            .track
                display: block
                position: relative
                top: 0
                left: 0

                &:after
                    clear: both
                    content: ""
                    display: table

                &.grab
                    cursor: grab

                &.grabbing
                    cursor: grabbing

        .navigation
            display: flex
            justify-content: center

            .nav
                text-decoration: none
                color: coral
                &:hover, &:focus
                    color: cornflowerblue

</style>
