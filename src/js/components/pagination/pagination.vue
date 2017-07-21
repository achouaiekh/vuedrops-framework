<template>

    <transition-group name="pagination" tag="nav" class="pagination">

        <div
                v-if="!noNavigation"
                :class="[ 'pagination__item', {'pagination__item--disabled': value === 1 && !cycle}]"
                @click="previous($event)"
                :key="1"
        >
            <a :href="link(value-1)"
               :class="['link', 'pagination__previous', {'chevron__left': chevron}]"
            >
                {{previousText}}
            </a>
        </div>


        <div class="pagination__item"
             v-for="n in items" :key="n"
             :class="{'pagination__item--active': value === n, 'pagination__more': isNaN(n)}"
             @click="to(n, $event)"
        >
            <a v-if="!isNaN(n)"
               :href="link(n)"
               v-text="n"
               class="link pagination__link"
            ></a>

            <span v-else>...</span>

        </div>


        <div v-if="!noNavigation"
             class="pagination__item"
             :class="{'pagination__item--disabled': value === totalPages && !cycle}"
             @click="next($event)"
             :key="2"
        >
            <a :href="link(value+1)"
               :class="['link', 'pagination__next', {'chevron__right': chevron}]"
            >
                {{nextText}}
            </a>
        </div>

    </transition-group>

</template>

<script>
    export default {

        name: 'pagination',

        props: {

            href: {
                type: String,
                default: "#<page>"
            },

            totalPages: {
                type: Number,
                default: 1
            },

            currentPage: {
                type: Number,
                default: 1
            },

            cycle: Boolean,

            noNavigation: Boolean,

            preventDefault: Boolean,

            shownPages: {
                type: Number,
                default: 5
            },

            chevron: Boolean,
            previousText: {
                type: String,
                default: "previous"
            },

            nextText: {
                type: String,
                default: "next"
            },
        },

        data(){
            return {
                value: this.currentPage,
                shown: this.even(this.shownPages),
                total: this.totalPages
            }
        },

        computed: {

            items () {

                let shown = this.shown,
                    value = this.value,
                    length = this.total

                if (this.shownPages === 0) return []

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

            previous(event){
                this.preventDef(event)
                if (this.value <= 1 && !this.cycle) return
                this.value--
                if (this.value < 1) this.value = this.totalPages
                this.$emit("previousPage", this.value)
                return false
            },

            preventDef(event){
                if (this.preventDefault) event.preventDefault()
            },

            to(value, event){
                this.preventDef(event)
                this.value = value
                this.$emit("gotoPage", this.value)
                return false
            },

            next(event){

                this.preventDef(event)

                if (this.value >= this.totalPages && !this.cycle) return

                this.value++

                if (this.value > this.totalpages) this.value = 1

                this.$emit("nextPage", this.value)

                return false
            },

            even(value){
                return value % 2 ? value : value + 1
            }
        },



    }
</script>

