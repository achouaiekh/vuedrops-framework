import Animation from './utils/animate/Animate'
import {TweenMax, TimeLineMax} from 'gsap'

export default {
    data(){
        return {
            animation: new Animation(),
            TweenMax,
            TimeLineMax
        }
    }
}
