import { swalPrefix, swalClasses } from './classes.js';
import validators from './validators.js';

// Remember state in cases where opening and handling a modal will fiddle with it.
export var states = {
  previousWindowKeyDown: null,
  previousActiveElement: null
};

/*
 * Manipulate DOM
 */
export var elementByClass = function(className) {
  return document.querySelector('.' + className);
};

export var getModal = function() {
  return elementByClass(swalClasses.modal);
};

export var getOverlay = function() {
  return elementByClass(swalClasses.overlay);
};

export var getConfirmButton = function() {
  return elementByClass(swalClasses.confirm);
};

export var getCancelButton = function() {
  return elementByClass(swalClasses.cancel);
};

export var getCloseButton = function() {
  return elementByClass(swalClasses.close);
};

export var getFocusableElements = function(focusCancel) {
  var buttons = [getConfirmButton(), getCancelButton()];
  if (focusCancel) {
    buttons.reverse();
  }
  return buttons.concat(Array.prototype.slice.call(
    getModal().querySelectorAll('button:not([class^=' + swalPrefix + ']), input:not([type=hidden]), textarea, select')
  ));
};

export var hasClass = function(elem, className) {
  return elem.classList.contains(className);
};

export var focusInput = function(input) {
  input.focus();

  // http://stackoverflow.com/a/2345915/1331425
  var val = input.value;
  input.value = '';
  input.value = val;
};

export var addClass = function(elem, className) {
  if (!elem || !className) {
    return;
  }
  var classes = className.split(/\s+/);
  classes.forEach(function(className) {
    elem.classList.add(className);
  });
};

export var removeClass = function(elem, className) {
  if (!elem || !className) {
    return;
  }
  var classes = className.split(/\s+/);
  classes.forEach(function(className) {
    elem.classList.remove(className);
  });
};

export var getChildByClass = function(elem, className) {
  for (var i = 0; i < elem.childNodes.length; i++) {
    if (hasClass(elem.childNodes[i], className)) {
      return elem.childNodes[i];
    }
  }
};

export var _show = function(elem) {
  elem.style.opacity = '';
  elem.style.display = 'block';
};

export var show = function(elems) {
  if (elems && !elems.length) {
    return _show(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _show(elems[i]);
  }
};

export var _hide = function(elem) {
  elem.style.opacity = '';
  elem.style.display = 'none';
};

export var hide = function(elems) {
  if (elems && !elems.length) {
    return _hide(elems);
  }
  for (var i = 0; i < elems.length; ++i) {
    _hide(elems[i]);
  }
};

// borrowed from jqeury $(elem).is(':visible') implementation
export var isVisible = function(elem) {
  return elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length;
};

export var removeStyleProperty = function(elem, property) {
  if (elem.style.removeProperty) {
    elem.style.removeProperty(property);
  } else {
    elem.style.removeAttribute(property);
  }
};

export var getTopMargin = function(elem) {
  var elemDisplay = elem.style.display;
  elem.style.left = '-9999px';
  elem.style.display = 'block';

  var height = elem.clientHeight;

  elem.style.left = '';
  elem.style.display = elemDisplay;
  return ('-' + parseInt(height / 2, 10) + 'px');
};

export var fadeIn = function(elem, interval) {
  if (+elem.style.opacity < 1) {
    interval = interval || 16;
    elem.style.opacity = 0;
    elem.style.display = 'block';
    var last = +new Date();
    var tick = function() {
      var newOpacity = +elem.style.opacity + (new Date() - last) / 100;
      elem.style.opacity = (newOpacity > 1) ? 1 : newOpacity;
      last = +new Date();

      if (+elem.style.opacity < 1) {
        setTimeout(tick, interval);
      }
    };
    tick();
  }
};

export var fadeOut = function(elem, interval) {
  if (+elem.style.opacity > 0) {
    interval = interval || 16;
    var opacity = elem.style.opacity;
    var last = +new Date();
    var tick = function() {
      var change = new Date() - last;
      var newOpacity = +elem.style.opacity - change / (opacity * 100);
      elem.style.opacity = newOpacity;
      last = +new Date();

      if (+elem.style.opacity > 0) {
        setTimeout(tick, interval);
      } else {
        _hide(elem);
      }
    };
    tick();
  }
};

export var fireClick = function(node) {
  // Taken from http://www.nonobtrusive.com/2011/11/29/programatically-fire-crossbrowser-click-event-with-javascript/
  // Then fixed for today's Chrome browser.
  if (typeof MouseEvent === 'function') {
    // Up-to-date approach
    var mevt = new MouseEvent('click', {
      view: window,
      bubbles: false,
      cancelable: true
    });
    node.dispatchEvent(mevt);
  } else if (document.createEvent) {
    // Fallback
    var evt = document.createEvent('MouseEvents');
    evt.initEvent('click', false, false);
    node.dispatchEvent(evt);
  } else if (document.createEventObject) {
    node.fireEvent('onclick');
  } else if (typeof node.onclick === 'function') {
    node.onclick();
  }
};

export var stopEventPropagation = function(e) {
  // In particular, make sure the space bar doesn't scroll the main window.
  if (typeof e.stopPropagation === 'function') {
    e.stopPropagation();
    e.preventDefault();
  } else if (window.event && window.event.hasOwnProperty('cancelBubble')) {
    window.event.cancelBubble = true;
  }
};

export var animationEndEvent = (function() {
  var testEl = document.createElement('div'),
    transEndEventNames = {
      'WebkitAnimation': 'webkitAnimationEnd',
      'OAnimation': 'oAnimationEnd oanimationend',
      'msAnimation': 'MSAnimationEnd',
      'animation': 'animationend'
    };
  for (var i in transEndEventNames) {
    if (transEndEventNames.hasOwnProperty(i) &&
      testEl.style[i] !== undefined) {
      return transEndEventNames[i];
    }
  }

  return false;
})();


// Reset the page to its previous state
export var resetPrevState = function() {
  var modal = getModal();
  window.onkeydown = states.previousWindowKeyDown;
  if (states.previousActiveElement && states.previousActiveElement.focus) {
    states.previousActiveElement.focus();
  }
  clearTimeout(modal.timeout);
};

// Remove dynamically created media query
export var addMediaQuery = function(content) {
  var mediaqueryId = swalPrefix + 'mediaquery-' + Math.random().toString(36).substring(2, 7);
  var head = document.getElementsByTagName('head')[0];
  var cssNode = document.createElement('style');
  cssNode.type = 'text/css';
  cssNode.id = mediaqueryId;
  cssNode.innerHTML = content;
  head.appendChild(cssNode);
  return mediaqueryId;
};

// Remove dynamically created media query
export var removeMediaQuery = function(mediaqueryId) {
  if (!mediaqueryId) {
    return false;
  }
  var head = document.getElementsByTagName('head')[0];
  var mediaquery = document.getElementById(mediaqueryId);
  if (mediaquery) {
    head.removeChild(mediaquery);
  }
};

export var addInput = function(input) {
  var modal = getModal();
  var fieldSet = document.createElement('fieldset');

  input.id = swalPrefix + '_' + input.name;

  if (!input.tag) {
    input.tag = 'input';
  }

  // Input value getters and setters
  var defaultValue = input.value;
  delete input.value;

  Object.defineProperty(input, 'value', {
    get: function() {
      if (!document.getElementById(input.id)) {
        return null;
      }

      return document.getElementById(input.id).value;
    },
    set: function(value) {
      if (document.getElementById(input.id)) {
        document.getElementById(input.id).value = value;
      }
      value = value;
    }
  });
  input.value = defaultValue;

  // Provide default validators
  if (typeof input.validator == 'undefined') {
    if (validators[input.type]) {
      input.validator = validators[input.type];
    }
  } else if (typeof input.validator == 'string') {
    if (validators[input.validator]) {
      input.validator = validators[input.validator];
    }
  }

  // Add label if present
  if (input.label) {
    var label = document.createElement('label');
    label.for = input.id;
    label.innerHTML = input.label;

    fieldSet.appendChild(label);
  }

  var inputNode = document.createElement(input.tag);
  inputNode.id = input.id;
  inputNode.name = input.name;

  // Add base class
  if (swalClasses[input.tag]) {
    inputNode.className = swalClasses[input.tag];
  }

  // Add custom attributes
  if (input.attributes) {
    var attributes = Object.keys(input.attributes);
    for (var i = attributes.length - 1; i >= 0; i--) {
      var attr = input.attributes[attributes[i]];
      if (inputNode[attributes[i]]) {
        inputNode[attributes[i]] += attr;
      } else {
        inputNode[attributes[i]] = attr;
      }
    }
  }

  // Input specific setup
  switch (input.tag) {
    case 'select':
      if (input.options) {
        var inputOptions = Object.keys(input.options);
        if (input.attributes && input.attributes.placeholder) {
          var option = document.createElement('option');
          option.selected = true;
          option.disabled = true;
          option.innerHTML = input.attributes.placeholder;
          
          inputNode.appendChild(option);
        }
        for (var i = inputOptions.length - 1; i >= 0; i--) {
          var option = document.createElement('option');
          
          option.value = inputOptions[i];
          option.innerHTML = input.options[inputOptions[i]];
          
          inputNode.appendChild(option);
        }
      }
      break;

    case null:
      // Silence is golden
      break;
  }

  // Add events
  inputNode.oninput = function() {
    sweetAlert.resetValidationError();
  };
  inputNode.onkeyup = function(event) {
    event.stopPropagation();
    if (event.keyCode === 13) {
      sweetAlert.clickConfirm();
    }
  };

  fieldSet.appendChild(inputNode);

  // Attach to form
  modal.getElementsByTagName('form')[0].appendChild(fieldSet);

  return input;
}
