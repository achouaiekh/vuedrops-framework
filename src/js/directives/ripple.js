import svgs from './svgs'

import Animation from "vuedrops-animate"

let ripple = {}
let rippleAnimation = (event, ripply_shape, during) => {

        let x = event.offsetX,
            y = event.offsetY,
            w = event.target.offsetWidth,
            h = event.target.offsetHeight,
            offsetX = Math.abs((w / 2) - x),
            offsetY = Math.abs((h / 2) - y),
            deltaX = (w / 2) + offsetX,
            deltaY = (h / 2) + offsetY,
            scale_ratio = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2));

        Animation.setStyles(ripply_shape, {transformOrigin: '50% 50%'})

        setAttributes(ripply_shape, {cx: x, cy: y, x, y})

        new Animation({during})
            .register('scale').css(ripply_shape, {transform: "scale(<value>)"}).from(0).to(scale_ratio)
            .register('opacity').css(ripply_shape, {opacity: "<value>"}).from(1).to(0)
            .animate('scale', ['opacity'])

    },

    setAttributes = function (element, attributes) {
        for (let property in attributes) {
            element.setAttribute(property, attributes[property])
        }
    },

    createElement = function (str) {
        let fragment = document.createDocumentFragment(),
            elem = document.createElement('div')

        elem.innerHTML = str

        while (elem.childNodes[0])
            fragment.appendChild(elem.childNodes[0])

        return fragment
    }


export default{

    bind(element, binding, vnode){

        let arg = binding.arg || "circle"

        if (!ripple.hasOwnProperty(arg))
            ripple[arg] = createElement(svgs[arg])

        console.log(ripple[arg], arg)

        element.appendChild(ripple[arg])


        if ('ontouchstart' in window)
            element.addEventListener('ontouchstart', (event) => rippleAnimation(event, element.querySelector("#ripple-shape"), 600), false)

        element.addEventListener('click', (event) => rippleAnimation(event,element.querySelector("#ripple-shape"), 600), false)


    },

    unbind(element, binding, vnode){

        element.removeChild(ripply_scott)

        if ('ontouchstart' in window)
            element.removeEventListener('ontouchstart', (event) => rippleAnimation(event, 750), false)

        element.removeEventListener('click', (event) => rippleAnimation(event, 750), false)
    }
}

