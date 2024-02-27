'use strict';

let DOMReady = function DOMReady() {
  let callback = arguments.length <= 0 || arguments[0] === undefined ? function () {} : arguments[0];
  let element = arguments.length <= 1 || arguments[1] === undefined ? document : arguments[1];
  let listener = arguments.length <= 2 || arguments[2] === undefined ? 'addEventListener' : arguments[2];

  return element[listener] ? element[listener]('DOMContentLoaded', callback) : window.attachEvent('onload', callback);
};

let ProjectAPI = function () {
  let hasClass = undefined,
      addClass = undefined,
      removeClass = undefined;

  hasClass = function hasClass(el, className) {
    if (el === null) {
      return;
    }

    if (el.classList) {
      return el.classList.contains(className);
    } else {
      return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
    }
  };

  addClass = function addClass(el, className) {
    if (el === null) {
      return;
    }

    if (el.classList) {
      el.classList.add(className);
    } else if (!hasClass(el, className)) {
      el.className += ' ' + className;
    }
  };

  removeClass = function removeClass(el, className) {
    if (el === null) {
      return;
    }

    if (el.classList) {
      el.classList.remove(className);
    } else if (hasClass(el, className)) {
      let reg = new RegExp('(\\s|^)' + className + '(\\s|$)');

      el.className = el.className.replace(reg, ' ');
    }
  };

  return {
    hasClass: hasClass,
    addClass: addClass,
    removeClass: removeClass
  };
}();

let readyFunction = function readyFunction() {

  let KEY_UP = 38;
  let KEY_DOWN = 40;

  let scrollingClass = 'js-scrolling',
      scrollingActiveClass = scrollingClass + '--active',
      scrollingInactiveClass = scrollingClass + '--inactive',
      scrollingTime = 700,
      scrollingIsActive = false,
      currentPage = 1,
      countOfPages = document.querySelectorAll('.' + scrollingClass + '__page').length,
      prefixPage = '.' + scrollingClass + '__page-',
      _switchPages = undefined,
      _scrollingUp = undefined,
      _scrollingDown = undefined,
      _mouseWheelEvent = undefined,
      _keyDownEvent = undefined,
      init = undefined;


  _switchPages = function _switchPages() {

    let _getPageDomEl = undefined;

    _getPageDomEl = function _getPageDomEl() {
      let page = arguments.length <= 0 || arguments[0] === undefined ? currentPage : arguments[0];

      return document.querySelector(prefixPage + page);
    };

    scrollingIsActive = true;


    ProjectAPI.removeClass(_getPageDomEl(), scrollingInactiveClass);
    ProjectAPI.addClass(_getPageDomEl(), scrollingActiveClass);

    ProjectAPI.addClass(_getPageDomEl(currentPage - 1), scrollingInactiveClass);

    ProjectAPI.removeClass(_getPageDomEl(currentPage + 1), scrollingActiveClass);

    setTimeout(function () {
      return scrollingIsActive = false;
    }, scrollingTime);
  };

  _scrollingUp = function _scrollingUp() {
    if (currentPage === 1) {
      return;
    }

    currentPage--;

    _switchPages();
  };

  _scrollingDown = function _scrollingDown() {
    if (currentPage === countOfPages) {
      return;
    }

    currentPage++;

    _switchPages();
  };


  _mouseWheelEvent = function _mouseWheelEvent(e) {
    if (scrollingIsActive) {
      return;
    }

    if (e.wheelDelta > 0 || e.detail < 0) {
      _scrollingUp();
    } else if (e.wheelDelta < 0 || e.detail > 0) {
      _scrollingDown();
    }
  };

  _keyDownEvent = function _keyDownEvent(e) {
    if (scrollingIsActive) {
      return;
    }

    let keyCode = e.keyCode || e.which;

    if (keyCode === KEY_UP) {
      _scrollingUp();
    } else if (keyCode === KEY_DOWN) {
      _scrollingDown();
    }
  };



  init = function (e) {
    document.addEventListener('mousewheel', _mouseWheelEvent, false);
    document.addEventListener('DOMMouseScroll', _mouseWheelEvent, false);;
    document.addEventListener('keydown', _keyDownEvent, false);
  }();
};

DOMReady(readyFunction);