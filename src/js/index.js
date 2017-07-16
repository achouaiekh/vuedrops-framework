import slide from './components/carousel/slide.vue'
import carousel from './components/carousel/carousel.vue'
import pagination from './components/pagination/pagination.vue'
import mixins from './mixins'


function plugin (Vue) {
    Vue.component("pagination", pagination)
    Vue.component("slide", slide)
    Vue.component("carousel", carousel)
}



if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.mixin(mixins)
    window.Vue.use(plugin)
}

export default plugin

export {slide, carousel}
