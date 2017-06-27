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

        <div class="navigation">

            <a
                    @click="prev()"
                    href="#"
                    class="nav prev">
                <--
            </a>

            <pagination
                    ref="pagination"
                    @nextPage="next"
                    @toPage="to"
                    @previousPage="prev"
                    :length="dots"
                    :class="paginationClass"
            ></pagination>

            <a
                    @click="next()"
                    href="#"
                    class="nav next">
                -->
            </a>
        </div>


    </div>

</template>


<script>

    import Carousel from './Carousel'
    import props from './props'
    import {pagination} from 'vuedrops-pagination'

    export default {

        name: 'carousel',
        components: {pagination},

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

<style lang="stylus">

    .vd-carousel

        outline: none
        position: relative
        display: block
        max-width: 100%

        .screen
            overflow: hidden
            position: relative
            display: block

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
