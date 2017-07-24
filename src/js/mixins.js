import {TweenMax, TimelineMax} from 'gsap'

export default {
    data(){
        return {
            TweenMax,
            TimelineMax
        }
    },

    methods: {
        parseIfNumber(value) {
            return !isNaN(value) && typeof value !== "boolean" ? parseInt(value) : value
        },

        proxy(fn, object = this) {

            return function () {
                return fn.apply(object, arguments)
            }
        }
    }
}
