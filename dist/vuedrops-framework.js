(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vuedrops"] = factory();
	else
		root["vuedrops"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "dist/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 12);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

// this module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = Object.create(options.computed || null)
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
    options.computed = computed
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(24)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_animate_Animate__ = __webpack_require__(13);


/* harmony default export */ __webpack_exports__["a"] = ({
    data: function data() {
        return {
            animation: new __WEBPACK_IMPORTED_MODULE_0__utils_animate_Animate__["a" /* default */]()
        };
    }
});

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(22)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(7),
  /* template */
  __webpack_require__(20),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Amine\\Desktop\\Code\\vuedrops-framework\\src\\js\\components\\carousel\\carousel.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] carousel.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-51e0b65f", Component.options)
  } else {
    hotAPI.reload("data-v-51e0b65f", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(23)

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(8),
  /* template */
  __webpack_require__(21),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Amine\\Desktop\\Code\\vuedrops-framework\\src\\js\\components\\carousel\\slide.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] slide.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-cc86627c", Component.options)
  } else {
    hotAPI.reload("data-v-cc86627c", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var Component = __webpack_require__(0)(
  /* script */
  __webpack_require__(9),
  /* template */
  __webpack_require__(19),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Amine\\Desktop\\Code\\vuedrops-framework\\src\\js\\components\\pagination\\pagination.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] pagination.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-11e9ea5f", Component.options)
  } else {
    hotAPI.reload("data-v-11e9ea5f", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Carousel__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__props__ = __webpack_require__(11);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//





/* harmony default export */ __webpack_exports__["default"] = ({

    name: 'carousel',

    data: function data() {
        return {
            carousel: null,
            dots: 0
        };
    },


    props: __WEBPACK_IMPORTED_MODULE_1__props__["a" /* default */],

    methods: {
        mount: function mount() {
            this.carousel = new __WEBPACK_IMPORTED_MODULE_0__Carousel__["a" /* default */](this);
        },
        to: function to(value) {

            var v = (value - 1) * this.carousel.slideToScrollCount;

            this.carousel.animate(v);
        },
        next: function next() {
            return this.carousel.next();
        },
        prev: function prev() {
            this.carousel.previous();
        }
    },

    mounted: function mounted() {
        this.mount();
    }
});

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    name: 'slide',

    props: {
        src: {
            type: String,
            default: 'dist/imgs/example1.jpg'

        },

        title: {
            type: String,
            default: ''

        },

        author: {
            type: String,
            default: ''

        },

        description: {
            type: String,
            default: ''

        },

        noCaption: {
            type: Boolean,
            default: false
        }
    },

    data: function data() {
        return {
            shown: false
        };
    }
});

/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({

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

    data: function data() {
        return {
            value: this.current,
            shown: this.even(this.shownPage)
        };
    },


    computed: {
        items: function items() {

            var shown = this.shown,
                value = this.value,
                length = this.length;

            if (this.shownPage === 0) return [];

            shown = shown < 3 ? 3 : this.even(shown);

            var center = Math.ceil(shown / 2);

            if (length <= shown) return this.range(1, length);

            var min = value - center;
            min = min > 0 ? min : 1;

            var max = min + shown + 1;
            max = max <= length ? max : length;

            if (max === length) min = length - shown - 1;

            min = min > 0 ? min : 1;

            var range = this.range(min, max);

            if (value >= center + 1 && length > shown + 1) range.splice(0, 2, 1, '...');

            if (this.value + center < length && length > shown + 1) range.splice(range.length - 2, 2, '...', length);

            return range;
        }
    },

    methods: {
        link: function link(n) {
            return this.href.replace('<page>', n);
        },
        range: function range(start, end) {
            return Array.from({ length: end - start + 1 }, function (v, k) {
                return k + start;
            });
        },
        previousPage: function previousPage() {
            if (this.value <= 1 && !this.cycle) return;
            this.value--;
            if (this.value < 1) this.value = this.length;
            this.$emit("previousPage", this.value);
            return false;
        },
        toPage: function toPage(value) {
            this.value = value;
            this.$emit("toPage", this.value);
            return false;
        },
        nextPage: function nextPage() {
            if (this.value >= this.length && !this.cycle) return;

            this.value++;
            if (this.value > this.length) this.value = 1;

            this.$emit("nextPage", this.value);

            return false;
        },
        currentPage: function currentPage(value) {
            this.value = value;
        },
        even: function even(value) {
            return value % 2 ? value : value + 1;
        }
    },

    mounted: function mounted() {
        this.$on('currentPage', this.currentPage);
    }
});

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
    function _class(vm) {
        _classCallCheck(this, _class);

        this.vm = vm;
        this.el = vm.$el;

        this.initialize();
        this.setProps();
        this.setup();
        this.init();
        this.initEvents();
    }

    _createClass(_class, [{
        key: 'init',
        value: function init() {

            this.updateSlideToShow();
            this.setSlides();
            this.setDimension();
            this.autoPlay();
        }
    }, {
        key: 'initialize',
        value: function initialize() {
            this.screen = this.el.querySelector('.screen');
            this.track = this.el.querySelector('.track');
            this.slides = Array.from(this.track.querySelectorAll('.slide'));
            this.slideCount = this.slides.length;
            this.slideToShowCount = 1;
            this.slideToScrollCount = 1;
            this.prevArrow = this.el.querySelector('.previous.arrow');
            this.nextArrow = this.el.querySelector('.next.arrow');
            this.dotNav = this.el.querySelector('.dot.pagination');
            this.screenWidth = this.screen.clientWidth;
            this.animationId = null;
            this.imgLoaded = false;
            this.__display = 'block';
            this.touch = { swipeLength: 0 };
            this.dragging = false;
        }
    }, {
        key: 'setProps',
        value: function setProps() {

            var props = this.vm.$props;

            for (var prop in props) {
                this[prop] = this.parseIfNumber(props[prop]);
            }
        }
    }, {
        key: 'parseIfNumber',
        value: function parseIfNumber(value) {

            return !isNaN(value) && typeof value !== "boolean" ? parseInt(value) : value;
        }
    }, {
        key: 'updateSlideToShow',
        value: function updateSlideToShow() {
            var _this2 = this;

            var slideToShow = this.slideToShow,
                slideToScroll = this.slideToScroll,
                screenWidth = this.screenWidth = this.screen.clientWidth;

            if (typeof slideToShow === 'number') this.slideToShowCount = slideToShow;

            if (typeof slideToScroll === 'number') this.slideToScrollCount = slideToScroll;

            Object.keys(this.breakpoints).sort(function (a, b) {
                return a - b;
            }).forEach(function (breakpoint) {
                if (screenWidth > _this2.breakpoints[breakpoint]) {

                    if ((typeof slideToShow === 'undefined' ? 'undefined' : _typeof(slideToShow)) === 'object' && slideToShow.hasOwnProperty(breakpoint) && typeof slideToShow[breakpoint] === 'number') _this2.slideToShowCount = slideToShow[breakpoint];

                    if ((typeof slideToScroll === 'undefined' ? 'undefined' : _typeof(slideToScroll)) === 'object' && slideToScroll.hasOwnProperty(breakpoint) && typeof slideToScroll[breakpoint] === 'number') _this2.slideToScrollCount = slideToScroll[breakpoint];
                }
            });

            //setup the initial current slide to meet the current dot
            var s = 0;

            do {
                s += this.slideToScrollCount;
            } while (s < this.currentSlide);

            this.previousSlide = this.currentSlide = s;

            console.log('current', s);

            if (this.fade) {
                this.el.classList.add('fade');
                this.slideToShowCount = 1;
            }

            if (this.slideCount <= this.slideToShowCount) {
                this.slideToShowCount = this.slideCount;
                [this.prevArrow, this.nextArrow, this.dotNav].forEach(function (el) {
                    return el.classList.add('disabled');
                });
            }

            if (this.slideToShowCount < this.slideToScrollCount) this.slideToScrollCount = this.slideToShowCount;
        }
    }, {
        key: 'setup',
        value: function setup() {

            this.animation = this.vm.animation.setOptions({
                speed: this.speed,
                context: this
            });

            this.breakpoints = Object.assign({}, BREAKPOINTS, this.breakpoints);

            if (this.vertical) this.el.classList.add('vertical');
        }
    }, {
        key: 'setSlides',
        value: function setSlides() {
            var _this3 = this;

            // make sure to remove the existing cloned slides
            this.track.querySelectorAll('.slide.cloned').forEach(function (cloned) {
                return _this3.track.removeChild(cloned);
            });

            if (this.fade) {

                this.slides.forEach(function (slide, index) {
                    return _this3.fadeOut(index);
                });

                this.fadeIn();
            } else {

                this.slides.slice(-this.slideToShowCount).reverse().forEach(function (slice) {
                    slice = slice.cloneNode(true);
                    slice.classList.add('cloned');
                    _this3.track.insertBefore(slice, _this3.track.firstChild);
                });

                this.slides.slice(0, this.slideToShowCount).forEach(function (slice) {
                    slice = slice.cloneNode(true);
                    slice.classList.add('cloned');
                    _this3.track.appendChild(slice);
                });
            }

            // select all type slide (cloned and original)
            this.allSlides = Array.from(this.track.querySelectorAll('.slide'));

            //the slides have same width if vertical or fade
            if (this.fade || this.vertical) this.allSlides.forEach(function (slide) {
                return slide.style.width = _this3.screenWidth + 'px';
            });

            //select all image (cloned and original)
            this.imgs = Array.from(this.track.querySelectorAll('.slide img'));
        }
    }, {
        key: 'fadeIn',
        value: function fadeIn() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentSlide;
            var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;

            this.slides[position].style.opacity = opacity;
            this.slides[position].style.zIndex = this.zIndex + 2;
        }
    }, {
        key: 'fadeOut',
        value: function fadeOut() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.previousSlide;
            var opacity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

            this.slides[position].style.opacity = opacity;
            this.slides[position].style.zIndex = this.zIndex + 1;
        }
    }, {
        key: 'setDimension',
        value: function setDimension() {
            var _this4 = this;

            if (this.imgLoaded) {
                this.el.style.display = this.__display;
                this.setHeight(this.calculateHeight());
                this.setDots();
            } else {

                this.__display = this.el.style.display;
                this.el.style.display = 'none';

                this.loadImages().then(function () {
                    _this4.imgLoaded = true;
                    _this4.el.style.display = _this4.__display;
                    _this4.setHeight(_this4.calculateHeight());
                    _this4.setDots();
                });
            }
        }
    }, {
        key: 'loadImages',
        value: function loadImages() {
            var _this5 = this;

            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {
                return null;
            };
            var count = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.imgs.length;


            return new Promise(function (resolve, reject) {
                var i = 0,
                    _this = _this5;

                _this5.imgs.forEach(function (img) {
                    return img.onload = function () {
                        callback.call(_this, _this5);
                        if (++i == count) resolve(_this);
                    };
                });
            });
        }
    }, {
        key: 'setHeight',
        value: function setHeight(height) {

            if (this.fade) this.track.style.height = height + 'px';else if (this.vertical) {
                this.screen.style.height = height + 'px';
                this.track.style.width = this.screen.clientWidth + 'px';

                this.allSlides.forEach(function (slide) {
                    return slide.style.height = slide.querySelector('img').offsetHeight + 'px';
                });
            } else {

                this.allSlides.forEach(function (slide) {
                    slide.style.height = height + 'px';
                    slide.style.width = slide.querySelector('img').clientWidth + 'px';
                });

                this.screen.style.height = height + 'px';

                this.track.style.width = this.allSlides.reduce(function (initial, slide) {
                    return initial + slide.offsetWidth + 1;
                }, 0) + 'px';
            }

            this.setLeft(this.calculateLeft(this.currentSlide));

            return this;
        }
    }, {
        key: 'calculateHeight',
        value: function calculateHeight() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentSlide;

            this.screenWidth = this.screen.clientWidth;

            if (this.fade) {
                return this.slides[position].offsetHeight;
            } else if (this.vertical) {
                return this.slides.slice(position, position + this.slideToShowCount).reduce(function (initial, slide) {
                    return initial + slide.querySelector('img').offsetHeight;
                }, 0);
            } else {
                var fraction = this.allSlides.slice(position + this.slideToShowCount, position + 2 * this.slideToShowCount).reduce(function (initial, slide) {
                    var img = slide.querySelector('img');

                    return initial + img.clientWidth / img.clientHeight;
                }, 0);

                return this.screenWidth / fraction;
            }
        }
    }, {
        key: 'setLeft',
        value: function setLeft(position) {

            console.log('this', this);

            var prop = this.vertical ? 'top' : 'left';

            this.track.style[prop] = position + 'px';

            this.offsetLeft = position;

            return this;
        }
    }, {
        key: 'calculateLeft',
        value: function calculateLeft() {
            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentSlide;


            if (this.fade) return 0;

            var prop = this.vertical ? 'offsetHeight' : 'offsetWidth';

            return this.allSlides.slice(0, position + this.slideToShowCount).reduce(function (initial, slide) {
                return initial - slide[prop];
            }, 0);
        }
    }, {
        key: 'autoPlay',
        value: function autoPlay() {
            var autoplay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.autoplay;


            var _this = this;

            if (autoplay) this.animationId = setInterval(function () {
                return _this.next();
            }, this.autoplayDelay);else clearInterval(this.animationId);
        }
    }, {
        key: 'setFade',
        value: function setFade(opacity) {

            this.fadeOut(this.previousSlide, 1 - opacity);
            this.fadeIn(this.currentSlide, opacity);
        }
    }, {
        key: 'next',
        value: function next() {

            if (this.animating) return;

            this.currentSlide += this.slideToScrollCount;

            this.rectifyNext();

            this.vm.$emit('currentPage', this.getDots(this.currentSlide));

            this.animate();
        }
    }, {
        key: 'rectifyNext',
        value: function rectifyNext() {

            var lastIndex = this.slideCount - 1;

            if (this.currentSlide > lastIndex) {

                this.currentSlide = 0;

                if (!this.fade) {
                    this.previousSlide = this.slideToScrollCount == 1 ? -1 : -(lastIndex % this.slideToScrollCount) - 1;
                }
            }
        }
    }, {
        key: 'previous',
        value: function previous() {

            if (this.animating) return;

            this.currentSlide -= this.slideToScrollCount;

            this.rectifyPrevious();

            this.animate();
        }
    }, {
        key: 'rectifyPrevious',
        value: function rectifyPrevious() {

            if (this.currentSlide < 0) {

                this.currentSlide = this.slideCount - 1;

                if (!this.fade) {
                    this.previousSlide = this.slideCount;
                    this.currentSlide = this.slideCount - 1 - this.calculateOffset();
                }
            }
        }
    }, {
        key: 'calculateOffset',
        value: function calculateOffset() {

            return this.slideToScrollCount === 1 ? 0 : (this.slideCount - 1) % this.slideToScrollCount;
        }
    }, {
        key: 'animate',
        value: function animate() {
            var _this6 = this;

            var position = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.currentSlide;
            var from = arguments[1];


            console.log(position);

            if (this.animating) return;

            this.animating = true;

            this.currentSlide = position;

            this.setDots();

            this.registerHeightAnimation();

            if (this.fade) {
                if (this.calculateHeight(this.previousSlide) > this.calculateHeight(this.currentSlide)) this.registerFadeAnimation().animate('height').then().animate('fade');else this.registerFadeAnimation().animate('fade').then().animate('height');
            } else this.registerSlideAnimation(from).animate('slide').then().animate('height');

            return this.animation.then(function () {
                _this6.animating = false;
                _this6.previousSlide = _this6.currentSlide;
            }, this);
        }

        /* getDots() {
           let count = Math.ceil(this.slides.length / this.slideToScrollCount),
         index = -1,
         dots = []
           while (++index < count) {
         dots.push({
         current: this.slideToScrollCount * index,
         active: (this.currentSlide === this.slideToScrollCount * index),
         index,
         })
         }
           return dots
           }*/

    }, {
        key: 'getDots',
        value: function getDots(value) {
            return Math.ceil(value / this.slideToScrollCount);
        }
    }, {
        key: 'registerHeightAnimation',
        value: function registerHeightAnimation() {

            var easing = this.heightEasing,
                from = this.calculateHeight(this.previousSlide),
                to = this.calculateHeight(this.currentSlide);

            return this.animation.register("height", this.setHeight).from(from).to(to).easing(easing).context(this);
        }
    }, {
        key: 'registerSlideAnimation',
        value: function registerSlideAnimation() {
            var from = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this.calculateLeft(this.previousSlide);
            var to = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.calculateLeft(this.currentSlide);


            var during = this.constantSpeed ? Math.ceil(Math.abs(to - from) / this.screenWidth) * this.slideToScrollCount * this.speed : this.speed,
                easing = this.slideEasing;

            return this.animation.then().register("slide", this.setLeft).options({ from: from, to: to, easing: easing, during: during }).context(this);
        }
    }, {
        key: 'registerFadeAnimation',
        value: function registerFadeAnimation() {

            return this.animation.then().register("fade", this.setFade).from(0).to(1).easing(this.fadeEasing).context(this);
        }
    }, {
        key: 'setDots',
        value: function setDots() {
            this.vm.dots = this.getDots(this.slideCount);
            this.vm.$refs.pagination.value = this.getDots(this.currentSlide) + 1;
        }
    }, {
        key: 'initEvents',
        value: function initEvents() {
            var _this7 = this;

            var remove = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;


            var eventListener = remove ? 'removeEventListener' : 'addEventListener';

            "mousedown touchstart mousemove touchmove mouseup touchend mouseleave touchcancel dblclick".split(" ").forEach(function (eventType) {
                return _this7.track[eventListener](eventType, _this7.proxy(_this7.swipeHandler));
            });

            window[eventListener]('resize', this.proxy(this.init));
        }
    }, {
        key: 'swipeHandler',
        value: function swipeHandler(event) {

            event.preventDefault();

            this.touch.fingerCount = event.changedTouches !== undefined ? event.changedTouches.length : 1;

            if (this.disableSwipe || this.fade || this.animating || this.touch.fingerCount !== 1) return false;

            switch (event.type) {
                case 'touchstart':
                case 'mousedown':
                    this.swipeStart(event);
                    break;

                case 'mousemove':
                case 'touchmove':
                    this.swipeMove(event);
                    break;

                case 'mouseup':
                case 'mouseleave':
                case 'touchend':
                case 'touchcancel':
                    this.swipeEnd(event);
                    break;

                case 'dblclick':
                    this.dragging = false;
                    break;

            }
        }
    }, {
        key: 'swipeStart',
        value: function swipeStart(event) {

            if (this.dragging) return false;

            this.track.style.cursor = "-webkit-grab";

            this.dragging = true;

            var touches = event.changedTouches && event.changedTouches[0];

            this.touch.startX = this.touch.curX = touches !== undefined ? touches.pageX : event.clientX;
            this.touch.startY = this.touch.curY = touches !== undefined ? touches.pageY : event.clientY;

            this.touch.swipeLength = 0;

            this.touch.originLeft = this.calculateLeft(this.previousSlide);

            this.setLeft(this.touch.originLeft);
        }
    }, {
        key: 'swipeMove',
        value: function swipeMove(event) {

            if (!this.dragging) return false;

            this.track.style.cursor = '-webkit-grabbing';

            var touches = event.changedTouches && event.changedTouches[0];

            this.touch.curX = touches !== undefined ? touches.pageX : event.clientX;
            this.touch.curY = touches !== undefined ? touches.pageY : event.clientY;

            this.touch.swipeLength = this.vertical ? this.touch.curY - this.touch.startY : this.touch.curX - this.touch.startX;

            var left0 = this.calculateLeft(0),
                leftlast = this.calculateLeft((Math.ceil(this.slides.length / this.slideToScrollCount) - 1) * this.slideToScrollCount);

            this.touch.offsetLeft = this.touch.originLeft + this.touch.swipeLength;

            if (this.touch.offsetLeft > left0) this.touch.offsetLeft = left0;
            if (this.touch.offsetLeft < leftlast) this.touch.offsetLeft = leftlast;

            this.setLeft(this.touch.offsetLeft);
        }
    }, {
        key: 'swipeEnd',
        value: function swipeEnd(event) {

            if (!this.dragging) return false;

            this.dragging = false;

            this.track.style.cursor = "default";

            var offsetLeft = this.touch.offsetLeft;

            if (Math.abs(this.touch.swipeLength) < this.minSwipeDistance) this.animate(this.previousSlide, offsetLeft);else {

                var direction = this.touch.direction = Math.sign(this.touch.swipeLength),
                    i = 0;

                while (++i) {

                    var position = this.calculateLeft(this.currentSlide);
                    if (direction * (position - offsetLeft) >= 0 || i > this.slideCount) break;
                    this.currentSlide -= direction * this.slideToScrollCount;
                }

                this.animate(this.currentSlide, offsetLeft);
            }
        }
    }, {
        key: 'proxy',
        value: function proxy(fn) {
            var object = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;


            return function () {
                return fn.apply(object, arguments);
            };
        }
    }]);

    return _class;
}();

/* harmony default export */ __webpack_exports__["a"] = (_class);


var BREAKPOINTS = {
    xs: 0,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200
};

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony default export */ __webpack_exports__["a"] = ({

    paginationClass: {
        type: String,
        default: "simple"
    },

    paginationShownPage: {
        type: Number,
        default: 5
    },

    slideToShow: {
        type: [Number, Object, String],
        default: 1
    },

    slideToScroll: {
        type: [Number, Object, String],
        default: 1
    },

    breakpoints: {
        type: Object
    },

    currentSlide: {
        type: [Number, String],
        default: 0
    },

    vertical: {
        type: Boolean,
        default: false
    },

    fade: {
        type: Boolean,
        default: false
    },

    speed: {
        type: [Number, String],
        default: 150
    },

    constantSpeed: {
        type: Boolean,
        default: false
    },

    slideEasing: {
        type: String,
        default: 'linear'
    },

    heightEasing: {
        type: String,
        default: 'linear'
    },

    fadeEasing: {
        type: String,
        default: 'linear'
    },

    autoplay: {
        type: Boolean,
        default: false
    },

    autoplayDelay: {
        type: [Number, String],
        default: 5000
    },

    disableSwipe: {
        type: Boolean,
        default: false
    },

    minSwipeDistance: {
        type: [Number, String],
        default: 10
    },

    zIndex: {
        type: [Number, String],
        default: 100
    }

});

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_carousel_slide_vue__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_carousel_slide_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__components_carousel_slide_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_carousel_carousel_vue__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_carousel_carousel_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1__components_carousel_carousel_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_pagination_pagination_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_pagination_pagination_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2__components_pagination_pagination_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__mixins__ = __webpack_require__(3);
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "slide", function() { return __WEBPACK_IMPORTED_MODULE_0__components_carousel_slide_vue___default.a; });
/* harmony reexport (default from non-hamory) */ __webpack_require__.d(__webpack_exports__, "carousel", function() { return __WEBPACK_IMPORTED_MODULE_1__components_carousel_carousel_vue___default.a; });





function plugin(Vue) {
    Vue.component("pagination", __WEBPACK_IMPORTED_MODULE_2__components_pagination_pagination_vue___default.a);
    Vue.component("slide", __WEBPACK_IMPORTED_MODULE_0__components_carousel_slide_vue___default.a);
    Vue.component("carousel", __WEBPACK_IMPORTED_MODULE_1__components_carousel_carousel_vue___default.a);
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.mixin(__WEBPACK_IMPORTED_MODULE_3__mixins__["a" /* default */]);
    window.Vue.use(plugin);
}

/* harmony default export */ __webpack_exports__["default"] = (plugin);



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__easings__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__OptionWrapper__ = __webpack_require__(14);
var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var defaultOptions = {
    from: 0,
    to: 1,
    during: 300,
    every: 10,
    easing: 'linear',
    callback: null,
    context: null,
    arguments: []
};

var Animation = function () {
    function Animation() {
        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Animation);

        this.requestAnimationFrame = Animation.registerRAF();

        this.defaultOptions = defaultOptions;
        this.setOptions(options);

        this.callbacks = {};
        this.canceled = {};
        this.registeredPromises = [];
        this.currentPromise = Promise.resolve(0);
    }

    _createClass(Animation, [{
        key: 'setOptions',
        value: function setOptions(options) {
            Object.assign(this.defaultOptions, options);
            return this;
        }

        //register the requestAnimationFrame

    }, {
        key: 'register',


        // register callback and setup animation options
        value: function register(name) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


            this.callbacks[name] = Object.assign({}, this.defaultOptions, options, { callback: callback });

            return new __WEBPACK_IMPORTED_MODULE_1__OptionWrapper__["a" /* default */](this, name, options);
        }
    }, {
        key: 'play',
        value: function play(args) {
            var _this2 = this;

            args.forEach(function (name) {

                var options = _this2.callbacks[name];

                options.callback.call(options.context, options.from);

                _this2.canceled[name] = false;

                var easing = __WEBPACK_IMPORTED_MODULE_0__easings__["a" /* default */][options.easing] || __WEBPACK_IMPORTED_MODULE_0__easings__["a" /* default */].linear;

                var promise = new Promise(function (resolve, reject) {

                    var _this = _this2;

                    var rfa = _this2.requestAnimationFrame;

                    var start = window.performance && window.performance.now ? window.performance.now() : +new Date();

                    function loop(timestamp) {

                        if (_this.canceled[name]) {
                            resolve();
                            return;
                        }

                        var time = (timestamp || +new Date()) - start;

                        if (time >= 0) options.callback.call(options.context, easing(time, options.from, options.to - options.from, options.during));

                        if (time >= 0 && time >= options.during) {
                            options.callback.call(options.context, options.to);
                            resolve();
                        } else {
                            rfa(loop);
                        }
                    }

                    rfa(loop);
                });

                _this2.registeredPromises.push(promise);
            });

            return this;
        }
    }, {
        key: 'animate',
        value: function animate() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
            }

            this.flatten(args);

            var _this = this;

            this.currentPromise.then(function () {
                _this.play(args);
            });

            return this;
        }
    }, {
        key: 'then',
        value: function then() {
            var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this;


            var _this = this;

            this.currentPromise = this.currentPromise.then(function () {

                var registered = _this.registeredPromises;

                _this.registeredPromises = [];

                return Promise.all(registered);
            });

            this.currentPromise.then(function () {
                return callback.call(context);
            });

            return this;
        }
    }, {
        key: 'after',
        value: function after() {
            var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


            var _this = this;

            this.currentPromise = this.currentPromise.then(function () {

                _this.registeredPromises = [];

                return new Promise(function (resolve, reject) {
                    return setTimeout(function () {
                        return resolve();
                    }, delay);
                });
            });

            return this;
        }
    }, {
        key: 'flatten',
        value: function flatten(names) {

            return names = [].concat.apply([], names);
        }
    }, {
        key: 'stop',
        value: function stop() {
            var _this3 = this;

            for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                args[_key2] = arguments[_key2];
            }

            this.flatten(args).forEach(function (id) {
                if (_this3.canceled[id] !== undefined) _this3.canceled[id] = true;
            });
        }
    }, {
        key: 'setStyles',
        value: function setStyles(element, properties) {

            Animation.setStyles(element, properties);

            return this;
        }
    }, {
        key: 'registerCss',
        value: function registerCss(name, element) {
            var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

            var callback = function callback(value) {
                for (var property in properties) {
                    Animation.setStyle(element, property, properties[property].replace('<value>', value));
                }
            };

            return this.register(name, callback, options);
        }
    }], [{
        key: 'registerRAF',
        value: function registerRAF() {

            var lastTime = 0;

            if (!window.requestAnimationFrame) ['webkit', 'moz'].forEach(function (prefix) {
                window.requestAnimationFrame = window[prefix + 'RequestAnimationFrame'];
                window.cancelAnimationFrame = window[prefix + 'CancelAnimationFrame'] || window[prefix + 'CancelRequestAnimationFrame'];
            });

            if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback) {

                var currTime = new Date().getTime(),
                    timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                    id = window.setTimeout(function () {
                    return callback(currTime + timeToCall);
                }, timeToCall);

                lastTime = currTime + timeToCall;

                return id;
            };

            if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
                return clearTimeout(id);
            };

            return window.requestAnimationFrame || function (callback) {
                window.setTimeout(callback, 1000 / 60);
            };
        }
    }, {
        key: 'setStyle',
        value: function setStyle(element, property, value) {

            var prefix = void 0;

            if (element.style[property] !== undefined) element.style[property] = value;else {
                prefix = ['Webkit', 'Moz', 'ms'].find(function (vendor) {
                    return element.style[vendor + property] !== undefined;
                }) || '';
                element.style[prefix + property] = value;
            }
        }
    }, {
        key: 'setStyles',
        value: function setStyles(element, properties, value) {
            if (typeof properties === "string") properties = _defineProperty({}, properties, value);

            for (var property in properties) {
                Animation.setStyle(element, property, properties[property]);
            }
        }
    }, {
        key: 'setAttributes',
        value: function setAttributes(element, attributes, value) {
            if (typeof attributes === "string") attributes = _defineProperty({}, attribute, value);
            for (var property in attributes) {
                element.setAttribute(property, attributes[property]);
            }
        }
    }, {
        key: 'isElement',
        value: function isElement(obj) {
            try {
                //Using W3 DOM2 (works for FF, Opera and Chrom)
                return obj instanceof HTMLElement;
            } catch (e) {
                //Browsers not supporting W3 DOM2 don't have HTMLElement and
                //an exception is thrown and we end up here. Testing some
                //properties that all elements have. (works on IE7)
                return (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === "object" && obj.nodeType === 1 && _typeof(obj.style) === "object" && _typeof(obj.ownerDocument) === "object";
            }
        }
    }]);

    return Animation;
}();

/* harmony default export */ __webpack_exports__["a"] = (Animation);

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OptionWrapper = function () {
    function OptionWrapper(animation, name) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        _classCallCheck(this, OptionWrapper);

        this.name = name;

        this.animation = animation;

        Object.assign(this.animation.callbacks[this.name], this.animation.callbacks[this.name], options);

        this._assignMethod();
    }

    _createClass(OptionWrapper, [{
        key: '_assignMethod',
        value: function _assignMethod(methods) {
            var _this = this;

            ['from', 'to', 'context', 'arguments', 'easing', 'every', 'during', 'callback'].forEach(function (method) {
                return _this.__proto__[method] = function (v) {
                    _this.animation.callbacks[_this.name][method] = v;
                    return _this;
                };
            });
        }
    }, {
        key: 'options',
        value: function options() {
            var _options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            Object.assign(this.animation.callbacks[this.name], this.animation.callbacks[this.name], _options);

            return this;
        }
    }, {
        key: 'call',
        value: function call(context) {
            for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
                args[_key - 1] = arguments[_key];
            }

            this.arguments.apply(this, args);
            this.context(context);
        }
    }, {
        key: 'apply',
        value: function apply(context, args) {

            this.call.apply(this, [context].concat(_toConsumableArray(args)));
        }
    }, {
        key: 'register',
        value: function register(name) {
            var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


            return this.animation.register(name, callback, options);
        }
    }, {
        key: 'registerCss',
        value: function registerCss(name, element) {
            var properties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};


            return this.animation.registerCss(name, element, properties, options);
        }
    }, {
        key: 'css',
        value: function css(element, properties) {
            var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};


            return this.animation.registerCss(this.name, element, properties, options);
        }
    }, {
        key: 'animate',
        value: function animate() {
            var _animation;

            return (_animation = this.animation).animate.apply(_animation, arguments);
        }
    }, {
        key: 'then',
        value: function then(callback) {
            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.animation;


            return this.animation.then(callback, context);
        }
    }, {
        key: 'stop',
        value: function stop() {
            var _animation2;

            return (_animation2 = this.animation).stop.apply(_animation2, arguments);
        }
    }, {
        key: 'after',
        value: function after() {
            var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;


            return this.animation.after(delay);
        }
    }]);

    return OptionWrapper;
}();

/* harmony default export */ __webpack_exports__["a"] = (OptionWrapper);

/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * TinyAnimate.easings
 *  Adapted from jQuery Easing
 */
/* harmony default export */ __webpack_exports__["a"] = ({
    linear: function linear(t, b, c, d) {
        return c * t / d + b;
    },
    easeInQuad: function easeInQuad(t, b, c, d) {
        return c * (t /= d) * t + b;
    },
    easeOutQuad: function easeOutQuad(t, b, c, d) {
        return -c * (t /= d) * (t - 2) + b;
    },
    easeInOutQuad: function easeInOutQuad(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t + b;
        return -c / 2 * (--t * (t - 2) - 1) + b;
    },
    easeInCubic: function easeInCubic(t, b, c, d) {
        return c * (t /= d) * t * t + b;
    },
    easeOutCubic: function easeOutCubic(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t + 1) + b;
    },
    easeInOutCubic: function easeInOutCubic(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t + 2) + b;
    },
    easeInQuart: function easeInQuart(t, b, c, d) {
        return c * (t /= d) * t * t * t + b;
    },
    easeOutQuart: function easeOutQuart(t, b, c, d) {
        return -c * ((t = t / d - 1) * t * t * t - 1) + b;
    },
    easeInOutQuart: function easeInOutQuart(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t + b;
        return -c / 2 * ((t -= 2) * t * t * t - 2) + b;
    },
    easeInQuint: function easeInQuint(t, b, c, d) {
        return c * (t /= d) * t * t * t * t + b;
    },
    easeOutQuint: function easeOutQuint(t, b, c, d) {
        return c * ((t = t / d - 1) * t * t * t * t + 1) + b;
    },
    easeInOutQuint: function easeInOutQuint(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2 * ((t -= 2) * t * t * t * t + 2) + b;
    },
    easeInSine: function easeInSine(t, b, c, d) {
        return -c * Math.cos(t / d * (Math.PI / 2)) + c + b;
    },
    easeOutSine: function easeOutSine(t, b, c, d) {
        return c * Math.sin(t / d * (Math.PI / 2)) + b;
    },
    easeInOutSine: function easeInOutSine(t, b, c, d) {
        return -c / 2 * (Math.cos(Math.PI * t / d) - 1) + b;
    },
    easeInExpo: function easeInExpo(t, b, c, d) {
        return t == 0 ? b : c * Math.pow(2, 10 * (t / d - 1)) + b;
    },
    easeOutExpo: function easeOutExpo(t, b, c, d) {
        return t == d ? b + c : c * (-Math.pow(2, -10 * t / d) + 1) + b;
    },
    easeInOutExpo: function easeInOutExpo(t, b, c, d) {
        if (t == 0) return b;
        if (t == d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
    },
    easeInCirc: function easeInCirc(t, b, c, d) {
        return -c * (Math.sqrt(1 - (t /= d) * t) - 1) + b;
    },
    easeOutCirc: function easeOutCirc(t, b, c, d) {
        return c * Math.sqrt(1 - (t = t / d - 1) * t) + b;
    },

    easeInOutCirc: function easeInOutCirc(t, b, c, d) {
        if ((t /= d / 2) < 1) return -c / 2 * (Math.sqrt(1 - t * t) - 1) + b;
        return c / 2 * (Math.sqrt(1 - (t -= 2) * t) + 1) + b;
    },
    easeInElastic: function easeInElastic(t, b, c, d) {
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return -(a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
    },
    easeOutElastic: function easeOutElastic(t, b, c, d) {
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d) == 1) return b + c;
        if (!p) p = d * .3;
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    },
    easeInOutElastic: function easeInOutElastic(t, b, c, d) {
        var p = 0;
        var a = c;
        if (t == 0) return b;
        if ((t /= d / 2) == 2) return b + c;
        if (!p) p = d * (.3 * 1.5);
        if (a < Math.abs(c)) {
            a = c;
            var s = p / 4;
        } else var s = p / (2 * Math.PI) * Math.asin(c / a);
        if (t < 1) return -.5 * (a * Math.pow(2, 10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p)) + b;
        return a * Math.pow(2, -10 * (t -= 1)) * Math.sin((t * d - s) * (2 * Math.PI) / p) * .5 + c + b;
    },
    easeInBack: function easeInBack(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * (t /= d) * t * ((s + 1) * t - s) + b;
    },
    easeOutBack: function easeOutBack(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        return c * ((t = t / d - 1) * t * ((s + 1) * t + s) + 1) + b;
    },
    easeInOutBack: function easeInOutBack(t, b, c, d, s) {
        if (s == undefined) s = 1.70158;
        if ((t /= d / 2) < 1) return c / 2 * (t * t * (((s *= 1.525) + 1) * t - s)) + b;
        return c / 2 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2) + b;
    },
    easeInBounce: function easeInBounce(t, b, c, d) {
        return c - easeOutBounce(d - t, 0, c, d) + b;
    },
    easeOutBounce: function easeOutBounce(t, b, c, d) {
        if ((t /= d) < 1 / 2.75) {
            return c * (7.5625 * t * t) + b;
        } else if (t < 2 / 2.75) {
            return c * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + b;
        } else if (t < 2.5 / 2.75) {
            return c * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + b;
        } else {
            return c * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + b;
        }
    },
    easeInOutBounce: function easeInOutBounce(t, b, c, d) {
        if (t < d / 2) return easeInBounce(t * 2, 0, c, d) * .5 + b;
        return easeOutBounce(t * 2 - d, 0, c, d) * .5 + c * .5 + b;
    }
});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.vd-carousel {\n  outline: none;\n  position: relative;\n  display: block;\n  max-width: 100%;\n}\n.vd-carousel .screen {\n  overflow: hidden;\n  position: relative;\n  display: block;\n  width: 100%;\n}\n.vd-carousel .screen .track {\n  display: block;\n  position: relative;\n  top: 0;\n  left: 0;\n}\n.vd-carousel .screen .track:after {\n  clear: both;\n  content: \"\";\n  display: table;\n}\n.vd-carousel .screen .track.grab {\n  cursor: grab;\n}\n.vd-carousel .screen .track.grabbing {\n  cursor: grabbing;\n}\n.vd-carousel .navigation {\n  display: flex;\n  justify-content: center;\n}\n.vd-carousel .navigation .nav {\n  text-decoration: none;\n  color: #ff7f50;\n}\n.vd-carousel .navigation .nav:hover,\n.vd-carousel .navigation .nav:focus {\n  color: #6495ed;\n}\n", ""]);

// exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)();
// imports


// module
exports.push([module.i, "\n.slide {\n  margin: 0;\n  position: relative;\n  float: left;\n}\n.slide img {\n  display: block;\n  height: 100%;\n}\n.slide figcaption {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  transform: translateY(-100%);\n  transition: transform 0.3s;\n  padding: 0.5em;\n  color: #fff;\n}\n.slide figcaption.shown {\n  transform: translateY(0);\n}\n.vertical .slide img {\n  height: auto;\n  width: 100%;\n}\n.vertical .slide figcaption {\n  transform: translateX(-100%);\n}\n.vertical .slide figcaption.shown {\n  transform: translateX(0);\n}\n.fade .slide {\n  position: absolute;\n}\n.fade .slide img {\n  position: relative;\n  top: 0;\n  z-index: 110;\n  width: 100%;\n  height: auto;\n}\n.fade .slide figcaption {\n  z-index: 115;\n}\n", ""]);

// exports


/***/ }),
/* 18 */,
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('nav', [_c('transition-group', {
    staticClass: "pagination",
    attrs: {
      "name": "pagination",
      "tag": "div"
    }
  }, [(_vm.navigation) ? _c('div', {
    key: 1,
    staticClass: "pagination__item",
    class: {
      'pagination__item--disabled': _vm.value === 1 && !_vm.cycle
    }
  }, [_c('a', {
    staticClass: "link pagination__previous chevron__left",
    attrs: {
      "href": _vm.link(_vm.value - 1)
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.previousPage($event)
      }
    }
  }, [_vm._v("\n                previous\n            ")])]) : _vm._e(), _vm._v(" "), _vm._l((_vm.items), function(n) {
    return _c('div', {
      key: n,
      staticClass: "pagination__item",
      class: {
        'pagination__item--active': _vm.value === n, 'pagination__more': isNaN(n)
      }
    }, [(!isNaN(n)) ? _c('a', {
      staticClass: "link pagination__link",
      attrs: {
        "href": _vm.link(n)
      },
      domProps: {
        "textContent": _vm._s(n)
      },
      on: {
        "click": function($event) {
          $event.preventDefault();
          _vm.toPage(n)
        }
      }
    }) : _c('span', [_vm._v("...")])])
  }), _vm._v(" "), (_vm.navigation) ? _c('div', {
    key: 2,
    staticClass: "pagination__item",
    class: {
      'pagination__item--disabled': _vm.value === _vm.length && !_vm.cycle
    }
  }, [_c('a', {
    staticClass: "link pagination__next chevron__right",
    attrs: {
      "href": _vm.link(_vm.value + 1)
    },
    on: {
      "click": function($event) {
        $event.preventDefault();
        _vm.nextPage()
      }
    }
  }, [_vm._v("\n                next\n            ")])]) : _vm._e()], 2)], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-11e9ea5f", module.exports)
  }
}

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "vd-carousel",
    attrs: {
      "tabindex": "1"
    },
    on: {
      "keyup": [function($event) {
        if (!('button' in $event) && $event.keyCode !== 38 && $event.keyCode !== 39) { return null; }
        _vm.carousel.next()
      }, function($event) {
        if (!('button' in $event) && $event.keyCode !== 37 && $event.keyCode !== 40) { return null; }
        _vm.carousel.previous()
      }, function($event) {
        if (!('button' in $event) && _vm._k($event.keyCode, "space", 32)) { return null; }
        _vm.carousel.autoPlay(false)
      }]
    }
  }, [_c('div', {
    staticClass: "screen"
  }, [_c('div', {
    staticClass: "track"
  }, [_vm._t("default")], 2)]), _vm._v(" "), _c('nav', {
    staticClass: "navigation"
  }, [_c('a', {
    staticClass: "arrow-navigation arrow-navigation__previous",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.prev()
      }
    }
  }, [_vm._v("\n            <--\n        ")]), _vm._v(" "), _c('pagination', {
    ref: "pagination",
    staticClass: "dot",
    class: _vm.paginationClass,
    attrs: {
      "length": _vm.dots,
      "shown-page": _vm.paginationShownPage
    },
    on: {
      "nextPage": _vm.next,
      "toPage": _vm.to,
      "previousPage": _vm.prev
    }
  }), _vm._v(" "), _c('a', {
    staticClass: "arrow-navigation  arrow-navigation__next",
    attrs: {
      "href": "#"
    },
    on: {
      "click": function($event) {
        _vm.next()
      }
    }
  }, [_vm._v("\n            -->\n        ")])], 1)])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-51e0b65f", module.exports)
  }
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('figure', {
    staticClass: "slide",
    on: {
      "dblclick": function($event) {
        _vm.shown = !_vm.shown
      },
      "mouseleave": function($event) {
        _vm.shown = false
      }
    }
  }, [_c('img', {
    attrs: {
      "src": _vm.src,
      "alt": _vm.title,
      "draggable": "false"
    }
  }), _vm._v(" "), (!_vm.noCaption) ? _c('figcaption', {
    class: {
      shown: _vm.shown
    }
  }, [_vm._t("caption", [_c('h3', [_vm._v(_vm._s(_vm.title) + "\n                "), _c('small', [_vm._v("by " + _vm._s(_vm.author))])]), _vm._v(" "), _c('p', [_vm._v(_vm._s(_vm.description))])])], 2) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-cc86627c", module.exports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(16);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7ecf7fce", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-51e0b65f\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/stylus-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./carousel.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-51e0b65f\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/stylus-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./carousel.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(17);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("20a41ff0", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-cc86627c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/stylus-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./slide.vue", function() {
     var newContent = require("!!../../../../node_modules/css-loader/index.js!../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"id\":\"data-v-cc86627c\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../node_modules/stylus-loader/index.js!../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./slide.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 24 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ })
/******/ ]);
});
//# sourceMappingURL=vuedrops-framework.js.map