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
        this.TweenMax = this.vm.TweenMax
        this.TimelineMax = new this.vm.TimelineMax()
        this.pagination = this.getPaginationComponent()
        this.screen = this.el.querySelector('.vd-carousel__screen')
        this.track = this.el.querySelector('.vd-carousel__track')
        this.slides = Array.from(this.track.querySelectorAll('.slide'))
        this.slideCount = this.slides.length
        this.slideToShowCount = 1
        this.slideToScrollCount = 1
        this.animationId = null
        this.imgLoaded = false
        this.__display = 'block'
        this.touch = {swipeLength: 0}
        this.dragging = false

        this.initProps()

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

        let props = this.vm.$props,
            parseIfNumber = this.vm.parseIfNumber

        for (let prop in props) this[prop] = parseIfNumber(props[prop])
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

        if (typeof slideToScroll !== 'number' || typeof slideToShow !== 'number')
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
        this.el.classList.remove('vd-carousel--fade')
        this.el.classList.remove('vd-carousel--vertical')

        if (this.fade) {

            this.el.classList.add('vd-carousel--fade')

            this.TweenMax.set(this.slides, {opacity: 0, zIndex: this.zIndex + 1})
        }

        else {

            if (this.vertical) this.el.classList.add('vd-carousel--vertical')

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

    setupDimension() {
        let Css = this.TweenMax

        if (this.imgLoaded) {
            this.setupWidth()
            this.animate()

        } else {

            this.__display = this.el.style.display
            Css.set(this.el, {display: "none"})

            this.loadImages().then(() => {
                Css.set(this.el, {display: this.__display})
                this.imgLoaded = true
                this.setupWidth()
                this.animate()
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
            }
        )

    }

    setupWidth() {

        this.imageFractions = this.imgs.map(img => img.clientWidth / img.clientHeight)

        let screenWidth = this.screenWidth = this.screen.clientWidth,
            min = Math.min.apply(Math, this.imageFractions),
            max = Math.max.apply(Math, this.imageFractions),
            maxWidth = screenWidth * max / min,
            width = (this.fade || this.vertical) ? screenWidth : maxWidth * this.slideCount

        this.TweenMax.set(this.track, {width})
    }

    calculateHeight(position = this.currentSlide) {

        if (this.fade)
            return this.slides[position].offsetHeight

        if (this.vertical)
            return this.allSlides
                .slice(position + this.slideToShowCount, position + 2 * this.slideToShowCount)
                .reduce((initial, slide) => initial + slide.offsetHeight, 0)


        return this.screenWidth /
            (
                this.imageFractions
                    .slice(position + this.slideToShowCount, position + 2 * this.slideToShowCount)
                    .reduce((initial, fraction) => initial + fraction, 0)
            )
    }


    calculateLeft(position = this.currentSlide) {

        if (this.fade) return 0

        let offsetHW = this.vertical ? 'offsetHeight' : 'offsetWidth',
            prop = this.vertical ? 'top' : 'left'

        return {
            [prop]: this.allSlides
                .slice(0, position + this.slideToShowCount)
                .reduce((initial, slide) => initial - slide[offsetHW], 0)
        }
    }

    autoPlay(autoplay = this.autoplay) {

        let _this = this

        clearInterval(this.animationId)

        if (autoplay)
            this.animationId = setInterval(() => _this.next(), this.autoplayDelay)
    }

    next() {

        if (this.animating) return

        this.getNextSlide()

        this.animate()
    }

    getNextSlide() {

        let lastIndex = this.slideCount - 1

        this.currentSlide += this.slideToScrollCount

        if (this.currentSlide > lastIndex) {

            this.currentSlide = 0

            if (!this.fade) this.previousSlide = this.slideToScrollCount === 1 ? -1 : (-1)(lastIndex % this.slideToScrollCount) - 1
        }
    }

    previous() {

        if (this.animating) return

        this.getPreviousSlide()

        this.animate()
    }

    getPreviousSlide() {

        this.currentSlide -= this.slideToScrollCount

        if (this.currentSlide < 0) {

            this.currentSlide = this.slideCount - 1

            if (!this.fade) {
                this.previousSlide = this.slideCount
                this.currentSlide =
                    (this.slideCount - 1) - (this.slideToScrollCount === 1 ? 0 : (this.slideCount - 1) % this.slideToScrollCount)
            }
        }
    }

    goto(to) {

        this.animate((to - 1) * this.slideToScrollCount)
    }

    animate(position = this.currentSlide) {

        if (this.animating) return

        this.animating = true

        this.currentSlide = position

        this.setupPagination()

        let height = this.calculateHeight(position),

            onComplete = function () {
                this.previousSlide = this.currentSlide
                this.animating = false
            },

            onUpdate = function () {
                this.TweenMax.set(this.track, this.calculateLeft())
            },

            [onCompleteScope, onUpdateScope] = [this, this],

            [currentSlide, previousSlide] = [this.slides[this.currentSlide], this.slides[this.previousSlide]],

            [TweenMax, TimelineMax] = [this.TweenMax, this.TimelineMax]


        if (this.fade) {

            let Tween1 = TweenMax.to(currentSlide, 0.3, {opacity: 1, zIndex: this.zIndex + 2}),
                Tween2 = TweenMax.to(previousSlide, 0.3, {opacity: 0, zIndex: this.zIndex + 1}),
                Tween3 = TweenMax.to(this.track, 0.3, {height})

            if (this.calculateHeight(this.previousSlide) < height)
                TimelineMax.add([Tween2, Tween1]).add(Tween3)
            else
                TimelineMax.add(Tween3).add([Tween2, Tween1])

            TimelineMax.call(onComplete, [], this)

        } else {

            let Tween1 = this.vertical ?
                TweenMax.to(this.screen, 0.3, {height, onUpdate, onUpdateScope, onCompleteScope, onComplete}) :
                TweenMax.to(this.allSlides, 0.3, {height, onUpdate, onUpdateScope, onCompleteScope, onComplete}),
                tween2 = TweenMax.to(this.track, .3, this.calculateLeft())

            TimelineMax.add(tween2)
                .add(Tween1)

        }


    }

    getPage(value) {
        return Math.ceil(value / this.slideToScrollCount)
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

        let proxy = this.vm.proxy

        this.pagination.$on('previousPage', proxy(this.previous, this))
        this.pagination.$on('nextPage', proxy(this.next, this))
        this.pagination.$on('gotoPage', proxy(this.goto, this))

        const eventListener = remove ? 'removeEventListener' : 'addEventListener'

        "mousedown touchstart mousemove touchmove mouseup touchend mouseleave touchcancel dblclick".split(" ")
            .forEach((eventType) => this.track[eventListener](eventType, proxy(this.swipeHandler, this)))

        window[eventListener]('resize', proxy(this.setup, this))
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

        this.dragging = true

        let touches = event.changedTouches && event.changedTouches[0]

        this.touch.startX = this.touch.curX = touches !== undefined ? touches.pageX : event.clientX
        this.touch.startY = this.touch.curY = touches !== undefined ? touches.pageY : event.clientY

        this.touch.swipeLength = 0
    }

    swipeMove(event) {

        if (!this.dragging) return false

        let touches = event.changedTouches && event.changedTouches[0]

        this.touch.curX = touches !== undefined ? touches.pageX : event.clientX
        this.touch.curY = touches !== undefined ? touches.pageY : event.clientY

        this.touch.swipeLength = this.vertical ?
            this.touch.curY - this.touch.startY :
            this.touch.curX - this.touch.startX

        if (Math.abs(this.touch.swipeLength) >= this.minSwipeDistance) {
            this.dragging = false
            if (this.touch.swipeLength > 0) this.previous()
            else this.next()
        }
    }

    swipeEnd(event) {
        this.dragging = false
    }
}

const BREAKPOINTS = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
}