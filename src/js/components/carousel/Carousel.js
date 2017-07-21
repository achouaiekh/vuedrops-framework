export default class {

    constructor(vm) {
        this.initProperties(vm)
        this.initEvents()
        this.setup()
        this.autoPlay()
    }

    initProperties(vm) {
        this.vm = vm
        this.el = vm.$el
        this.pagination = this.getPaginationComponent()
        this.screen = this.el.querySelector('.screen')
        this.track = this.el.querySelector('.track')
        this.slides = Array.from(this.track.querySelectorAll('.slide'))
        this.slideCount = this.slides.length
        this.slideToShowCount = 1
        this.slideToScrollCount = 1
        this.screenWidth = this.screen.clientWidth
        this.animationId = null
        this.imgLoaded = false
        this.__display = 'block'
        this.touch = {swipeLength: 0}
        this.dragging = false

        this.initProps()

        this.animation = this.vm.animation.setOptions({
            speed: this.speed,
            context: this,
        })

        this.breakpoints = Object.assign({}, BREAKPOINTS, this.breakpoints)
    }


    setup() {
        this.setupSlideToShowAndToScroll()
        this.setupCurrentSlide()
        this.setupSlides()
        this.setupDimension()
        this.setupPagination()
    }

    setupCurrentSlide() {
        //setup the initial current slide to meet the current page
        this.currentSlide = this.previousSlide =
            Math.floor(this.currentSlide / this.slideToScrollCount) * this.slideToScrollCount
    }

    initProps() {

        let props = this.vm.$props

        for (let prop in props) this[prop] = this.parseIfNumber(props[prop])

    }

    parseIfNumber(value) {
        return !isNaN(value) && typeof value !== "boolean" ? parseInt(value) : value
    }

    setupSlideToShowAndToScroll() {

        if (this.fade)
            return this.slideToScrollCount = this.slideToShowCount = 1

        let slideToShow = this.slideToShow,
            slideToScroll = this.slideToScroll,
            screenWidth = this.screenWidth = this.screen.clientWidth


        if (typeof slideToShow === 'number')
            this.slideToShowCount = slideToShow

        if (typeof slideToScroll === 'number')
            this.slideToScrollCount = slideToScroll

        if (!typeof slideToScroll === 'number' && !typeof slideToShow === 'number')
            Object.keys(this.breakpoints)
                .sort((a, b) => a - b)
                .forEach(breakpoint => {
                    if (screenWidth > this.breakpoints[breakpoint]) {

                        if (slideToShow.hasOwnProperty(breakpoint))
                            this.slideToShowCount = this.parseIfNumber(slideToShow[breakpoint])

                        if (slideToScroll.hasOwnProperty(breakpoint))
                            this.slideToScrollCount = this.parseIfNumber(slideToScroll[breakpoint])
                    }
                })

        if (this.slideCount <= this.slideToShowCount)
            this.slideToShowCount = this.slideCount

        if (this.slideToShowCount < this.slideToScrollCount)
            this.slideToScrollCount = this.slideToShowCount

    }

    setupSlides() {

        // make sure to remove the existing cloned slides
        this.track.querySelectorAll('.slide.cloned').forEach(cloned => this.track.removeChild(cloned))

        if (this.fade) {

            this.el.classList.add('carousel__fade')

            this.slides.forEach((slide, index) => this.fadeOut(index))

            this.fadeIn()
        }

        else {

            this.slides
                .slice(-this.slideToShowCount)
                .reverse()
                .forEach((slice) => {
                    slice = slice.cloneNode(true)
                    slice.classList.add('cloned')
                    this.track.insertBefore(slice, this.track.firstChild)
                })

            this.slides
                .slice(0, this.slideToShowCount)
                .forEach((slice) => {
                    slice = slice.cloneNode(true)
                    slice.classList.add('cloned')
                    this.track.appendChild(slice)
                })
        }

        // select all type of slides (cloned and original)
        this.allSlides = Array.from(this.track.querySelectorAll('.slide'))

        //select all image (cloned and original)
        this.imgs = Array.from(this.track.querySelectorAll('.slide img'))

    }

    fadeIn(position = this.currentSlide, opacity = 1) {
        this.slides[position].style.opacity = opacity
        this.slides[position].style.zIndex = this.zIndex + 2
    }

    fadeOut(position = this.previousSlide, opacity = 0) {
        this.slides[position].style.opacity = opacity
        this.slides[position].style.zIndex = this.zIndex + 1
    }

    setupDimension() {

        if (this.imgLoaded) {
            this.el.style.display = this.__display
            this.setupWidth()
            this.setHeight(this.calculateHeight())

        } else {

            this.__display = this.el.style.display
            this.el.style.display = 'none'

            this.loadImages().then(() => {
                this.imgLoaded = true
                this.el.style.display = this.__display
                this.imageFractions = this.getImageFractions()
                this.setupWidth()
                this.setHeight(this.calculateHeight())
            })
        }
    }

    loadImages(callback = () => null, count = this.imgs.length) {

        return new Promise((resolve, reject) => {
            let i = 0,
                _this = this

            this.imgs.forEach((img) => img.onload = () => {
                callback.call(_this, this)
                if (++i == count) resolve(_this)
            })
        })

    }


    getImageFractions() {
        return this.allSlides.map((slide) => {
            let img = slide.querySelector('img')
            return img.clientWidth / img.clientHeight
        })
    }

    setupWidth() {

        this.imageFractions = this.getImageFractions()

        let min =  Math.min.apply(Math, this.imageFractions),
            max = Math.max.apply(Math, this.imageFractions),
            maxH = this.screenWidth / min,
            maxWidth = maxH * max


        //the slides have same width as the carousel screen if it is vertical or fading
        if (this.fade || this.vertical) {
            this.allSlides.forEach((slide) => slide.style.width = this.screenWidth + 'px')
            this.track.style.width = this.screen.clientWidth + 'px'
        } else
            this.track.style.width = maxWidth * this.allSlides.length + 'px'

    }

    setHeight(height) {


        if (this.fade)
            this.track.style.height = height + 'px'

        else if (this.vertical) {
            this.screen.style.height = height + 'px'


            this.allSlides.forEach((slide) => slide.style.height = slide.querySelector('img').offsetHeight + 'px')
        }

        else
            this.allSlides.forEach((slide) => slide.style.height = height + 'px')


        this.setLeft(this.calculateLeft(this.currentSlide))

        return this
    }

    calculateHeight(position = this.currentSlide) {

        //update the screen width (on resize)
        this.screenWidth = this.screen.clientWidth

        if (this.fade) {
            return this.slides[position].offsetHeight
        }

        else if (this.vertical) {
            return this.slides
                .slice(position, position + this.slideToShowCount)
                .reduce((initial, slide) => initial + slide.querySelector('img').offsetHeight, 0)
        }

        else {

            return this.screenWidth / (this.imageFractions
                    .slice(position + this.slideToShowCount, position + 2 * this.slideToShowCount)
                    .reduce((initial, fraction) => initial + fraction, 0)
                )
        }
    }

    setLeft(position) {

        let prop = this.vertical ? 'top' : 'left'

        this.track.style[prop] = position + 'px'

        this.offsetLeft = position

        return this
    }

    calculateLeft(position = this.currentSlide) {

        if (this.fade) return 0

        let prop = this.vertical ? 'offsetHeight' : 'offsetWidth'

        return this.allSlides
            .slice(0, position + this.slideToShowCount)
            .reduce((initial, slide) => initial - slide[prop], 0)
    }

    autoPlay(autoplay = this.autoplay) {

        let _this = this

        clearInterval(this.animationId)

        if (autoplay)
            this.animationId = setInterval(() => _this.next(), this.autoplayDelay)
    }

    setFade(opacity) {

        this.fadeOut(this.previousSlide, 1 - opacity)
        this.fadeIn(this.currentSlide, opacity)
    }


    next() {

        if (this.animating) return

        this.currentSlide += this.slideToScrollCount

        this.rectifyNext()

        this.animate()
    }

    rectifyNext() {

        let lastIndex = this.slideCount - 1

        if (this.currentSlide > lastIndex) {

            this.currentSlide = 0

            if (!this.fade) {
                this.previousSlide = this.slideToScrollCount == 1 ?
                    -1 : -(lastIndex % this.slideToScrollCount) - 1
            }
        }
    }

    previous() {

        if (this.animating) return

        this.currentSlide -= this.slideToScrollCount

        this.rectifyPrevious()

        this.animate()
    }

    rectifyPrevious() {

        if (this.currentSlide < 0) {

            this.currentSlide = this.slideCount - 1

            if (!this.fade) {
                this.previousSlide = this.slideCount
                this.currentSlide = this.slideCount - 1 - this.calculateOffset()
            }


        }
    }

    calculateOffset() {
        return this.slideToScrollCount === 1 ? 0 : (this.slideCount - 1) % this.slideToScrollCount
    }

    goto(to) {

        this.animate((to - 1) * this.slideToScrollCount)
    }

    animate(position = this.currentSlide, from) {

        if (this.animating) return

        this.animating = true

        this.currentSlide = position

        this.setupPagination()

        this.registerHeightAnimation()

        if (this.fade)

            if (this.calculateHeight(this.previousSlide) > this.calculateHeight(this.currentSlide))
                this.registerFadeAnimation().animate('height').then().animate('fade')

            else
                this.registerFadeAnimation().animate('fade').then().animate('height')

        else
            this.registerSlideAnimation(from).animate('slide').then().animate('height')


        return this.animation.then(() => {
            this.animating = false
            this.previousSlide = this.currentSlide
        }, this)

    }

    getPage(value) {
        return Math.ceil(value / this.slideToScrollCount)
    }

    registerHeightAnimation() {

        let easing = this.heightEasing,
            from = this.calculateHeight(this.previousSlide),
            to = this.calculateHeight(this.currentSlide)

        return this.animation.register("height", this.setHeight).from(from).to(to).easing(easing).context(this)


    }

    registerSlideAnimation(from = this.calculateLeft(this.previousSlide),
                           to = this.calculateLeft(this.currentSlide)) {

        let during = this.constantSpeed ?
                Math.ceil(Math.abs(to - from) / this.screenWidth) * this.slideToScrollCount * this.speed :
                this.speed,

            easing = this.slideEasing

        return this.animation.then().register("slide", this.setLeft).options({from, to, easing, during}).context(this)
    }

    registerFadeAnimation() {

        return this.animation.then().register("fade", this.setFade).from(0).to(1).easing(this.fadeEasing).context(this)
    }

    setupPagination() {
        this.pagination.value = this.currentPage()
        this.pagination.total = this.totalPages()
    }

    getPaginationComponent() {
        if (this.vm.$refs.hasOwnProperty('pagination'))
            return this.vm.$refs.pagination
        if (this.vm.$slots.hasOwnProperty('pagination'))
            return this.vm.$slots.pagination.pop().componentInstance
    }

    totalPages() {
        return this.getPage(this.slideCount)
    }

    currentPage() {
        return this.getPage(this.currentSlide) + 1
    }

    initEvents(remove = false) {

        this.pagination.$on('previousPage', this.proxy(this.previous))
        this.pagination.$on('nextPage', this.proxy(this.next))
        this.pagination.$on('gotoPage', this.proxy(this.goto))

        const eventListener = remove ? 'removeEventListener' : 'addEventListener'

        "mousedown touchstart mousemove touchmove mouseup touchend mouseleave touchcancel dblclick".split(" ")
            .forEach((eventType) => this.track[eventListener](eventType, this.proxy(this.swipeHandler)))

        window[eventListener]('resize', this.proxy(this.setup))
    }


    swipeHandler(event) {

        event.preventDefault()

        this.touch.fingerCount = event.changedTouches !== undefined ? event.changedTouches.length : 1

        if (this.disableSwipe || this.fade || this.animating || this.touch.fingerCount !== 1) return false


        switch (event.type) {
            case 'touchstart':
            case 'mousedown':
                this.swipeStart(event)
                break

            case 'mousemove':
            case 'touchmove':
                this.swipeMove(event)
                break

            case 'mouseup':
            case 'mouseleave':
            case 'touchend':
            case 'touchcancel':
                this.swipeEnd(event)
                break

            case 'dblclick':
                this.dragging = false
                break

        }

    }

    swipeStart(event) {

        if (this.dragging) return false

        this.track.style.cursor = "-webkit-grab"

        this.dragging = true

        let touches = event.changedTouches && event.changedTouches[0]

        this.touch.startX = this.touch.curX = touches !== undefined ? touches.pageX : event.clientX
        this.touch.startY = this.touch.curY = touches !== undefined ? touches.pageY : event.clientY

        this.touch.swipeLength = 0

        this.touch.originLeft = this.calculateLeft(this.previousSlide)

        this.setLeft(this.touch.originLeft)

    }

    swipeMove(event) {

        if (!this.dragging) return false

        this.track.style.cursor = '-webkit-grabbing'

        let touches = event.changedTouches && event.changedTouches[0]

        this.touch.curX = touches !== undefined ? touches.pageX : event.clientX
        this.touch.curY = touches !== undefined ? touches.pageY : event.clientY

        this.touch.swipeLength = this.vertical ?
            this.touch.curY - this.touch.startY :
            this.touch.curX - this.touch.startX

        let left0 = this.calculateLeft(0),
            leftlast = this.calculateLeft((Math.ceil(this.slides.length / this.slideToScrollCount) - 1) * this.slideToScrollCount)

        this.touch.offsetLeft = this.touch.originLeft + this.touch.swipeLength

        if (this.touch.offsetLeft > left0) this.touch.offsetLeft = left0
        if (this.touch.offsetLeft < leftlast) this.touch.offsetLeft = leftlast

        this.setLeft(this.touch.offsetLeft)
    }

    swipeEnd(event) {

        if (!this.dragging) return false

        this.dragging = false

        this.track.style.cursor = "default"

        let offsetLeft = this.touch.offsetLeft

        if (Math.abs(this.touch.swipeLength) < this.minSwipeDistance)
            this.animate(this.previousSlide, offsetLeft)

        else {

            let direction = this.touch.direction = Math.sign(this.touch.swipeLength),
                i = 0


            while (++i) {

                let position = this.calculateLeft(this.currentSlide)
                if (direction * (position - offsetLeft) >= 0 || i > this.slideCount) break
                this.currentSlide -= direction * this.slideToScrollCount
            }

            this.animate(this.currentSlide, offsetLeft)


        }

    }

    proxy(fn, object = this) {

        return function () {
            return fn.apply(object, arguments)
        }
    }


}

const BREAKPOINTS = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
}