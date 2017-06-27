<template>

    <nav class="pagination">

        <div v-if="navigation" class="pagination__navigation">
            <a :href="link(value-1)"
               :class="{'pagination__navigation__link--disabled': value === 1 && !cycle}"
               class="pagination__navigation__link prev"
               @click.prevent="previousPage"

            >
                prev
            </a>
        </div>


        <div class="pagination__item"
             v-for="n in items" :key="n"
             :class="{'pagination__item--active': value === n, more: isNaN(n)}"
        >
            <a v-if="!isNaN(n)"
               :href="link(n)"
               v-text="n"
               @click.prevent="toPage(n)"
               class="pagination__link"
            ></a>

            <span v-else class="pagination__more">...</span>

        </div>


        <div v-if="navigation" class="pagination__navigation">
            <a :href="link(value+1)"
               :class="{'pagination__navigation__link--disabled': value === length && !cycle}"
               class="pagination__navigation__link next"
               @click.prevent="nextPage()"
            >
                next
            </a>
        </div>

    </nav>


</template>

<script>
    export default {

        name: 'pagination',

        props: {

            href: {
                type: String,
                default: "#"
            },

            length: {
                type: Number,
                default: 1
            },

            current: {
                type: Number,
                default: 1
            },

            cycle: Boolean,

            navigation: Boolean,

            prevent: Boolean,

            shownPage: {
                type: Number,
                default: 5
            }
        },

        data(){
            return {
                value: this.current,
                shown: this.even(this.shownPage)
            }
        },

        computed: {

            items () {

                let shown = this.shown,
                    value = this.value,
                    length = this.length,
                    center = Math.ceil(shown / 2)

                if (length <= shown) return this.range(1, length)

                let min = value - center
                min = min > 0 ? min : 1

                let max = min + shown + 1
                max = max <= length ? max : length

                if (max === length)
                    min = length - shown - 1


                const range = this.range(min, max)

                if (value >= center + 1 && length > shown + 1)
                    range.splice(0, 2, 1, '...')

                if (this.value + center < length && length > shown + 1)
                    range.splice(range.length - 2, 2, '...', length)


                return range
            }
        },


        methods: {

            link(n){
                return this.href.replace('<page>', n)
            },

            range (start, end) {
                return Array.from({length: (end - start + 1)}, (v, k) => k + start);
            },

            previousPage(){
                if (this.value <= 1 && !this.cycle) return
                this.value--
                if (this.value < 1) this.value = this.length
                this.$emit("previousPage", this.value)
                return false
            },

            toPage(value){
                this.value = value
                this.$emit("toPage", this.value)
                return false
            },

            nextPage(){
                if (this.value >= this.length && !this.cycle) return

                this.value++
                if (this.value > this.length) this.value = 1

                this.$emit("nextPage", this.value)

                return false
            },

            currentPage(value){
                this.value = value
            },

            even(value){
                return value % 2 ? value : value + 1
            }
        },

        mounted(){
            this.$on('currentPage', this.currentPage)
        }
    }
</script>

<style lang="stylus">
    .pagination
        position relative
        display flex
        justify-content center
        align-items center
        padding 0
        margin 0

        &__item, &__navigation
            position relative
            padding 0
            margin .3em
            &:focus
                outline none

        &__item--active
           .pagination__link
            color cornflowerblue

        &__navigation__link--disabled
            opacity .2
            pointer-events none

        &__link, &__more, &__navigation__link
            padding 0
            margin 0
            color coral
            text-decoration none


</style>
