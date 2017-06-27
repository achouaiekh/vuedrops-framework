import slide from './slide.vue'
import carousel from './carousel.vue'


function plugin (Vue) {
    Vue.component("slide", slide)
    Vue.component("carousel", carousel)
}



if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin)
}

export default plugin

export {slide, carousel}