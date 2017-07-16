
<template>

    <nav>
        <transition-group name="pagination" tag="div" class="pagination">
            <div
                    v-if="navigation"
                    class="pagination__item"
                    :class="{'pagination__item--disabled': value === 1 && !cycle}"
                    :key="1"
            >
                <a :href="link(value-1)"
                   class="link pagination__previous chevron__left"
                   @click.prevent="previousPage"
                >
                    previous
                </a>
            </div>


            <div class="pagination__item"
                 v-for="n in items" :key="n"
                 :class="{'pagination__item--active': value === n, 'pagination__more': isNaN(n)}"
            >
                <a v-if="!isNaN(n)"
                   :href="link(n)"
                   v-text="n"
                   @click.prevent="toPage(n)"
                   class="link pagination__link"
                ></a>

                <span v-else>...</span>

            </div>


            <div v-if="navigation"
                 class="pagination__item"
                 :class="{'pagination__item--disabled': value === length && !cycle}"
                 :key="2"
            >
                <a :href="link(value+1)"
                   class="link pagination__next chevron__right"
                   @click.prevent="nextPage()"
                >
                    next
                </a>
            </div>

        </transition-group>


    </nav>


</template>

<script>
    export default {

        name: 'pagination',

        props: {

            href: {
                type: String,
                default: "#<page>"
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
                    length = this.length

                if (this.shownPage === 0) return []

                shown = shown < 3 ? 3 : this.even(shown)


                let center = Math.ceil(shown / 2)

                if (length <= shown) return this.range(1, length)

                let min = value - center
                min = min > 0 ? min : 1

                let max = min + shown + 1
                max = max <= length ? max : length

                if (max === length)
                    min = length - shown - 1

                min = min > 0 ? min : 1


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

