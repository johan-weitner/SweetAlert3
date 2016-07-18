import { swalPrefix, swalClasses } from './classes.js';

import validators from './validators.js';
import * as dom from './dom.js';

export var generateForm = function(inputs) {
  var modal = dom.getModal();
  var form = modal.getElementsByTagName('form')[0];
  // Add each input individually
  for (var i = inputs.length - 1; i >= 0; i--) {
    form.appendChild(addInputToForm(inputs[i]));
  }
}

export var formatInput = function(input) {
  // Generate a "unique(ish)" id
  input.id = swalPrefix + '_' + input.name;
  // Default the tag to input
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
  return input;
}

export var addInputToForm = function(input) {
  var fieldSet = document.createElement('fieldset');

  formatInput(input);

  // Add label if present
  if (input.label) {
    var label = document.createElement('label');
    label.for = input.id;
    label.innerHTML = input.label;

    fieldSet.appendChild(label);
  }

  var $input;

  // Input specific setup
  switch (input.tag) {
    case 'select':
      $input = addSelect(input)
      break;

    case 'input':
      switch (input.type) {
        case 'checkbox':
        case 'radio':
          $input = addCheckbox(input)
          break;

        default:
          $input = addInput(input);
          break;
      }

    default:
      $input = addInput(input);
      break;
  }


  // Add events
  $input.oninput = function() {
    sweetAlert.resetValidationError();
  };
  $input.onkeyup = function(event) {
    event.stopPropagation();
    if (event.keyCode === 13) {
      sweetAlert.clickConfirm();
    }
  };
  fieldSet.appendChild($input);

  return fieldSet;
}

export var addInput = function(input) {
  var inputNode = document.createElement(input.tag);
  inputNode.id = input.id;
  inputNode.name = input.name;

  // Add base class
  if (swalClasses[input.tag]) {
    inputNode.className = swalClasses[input.tag];
  }

  // Add custom attributes
  if (input.attributes) {
    addAttributes(inputNode, input.attributes);
  }

  // Set the type attributes
  if (input.tag == 'input') {
    inputNode.type = input.type
  }

  return inputNode;
}

export var addAttributes = function(input, attributes) {
  var attributes = Object.keys(attributes);
  for (var i = attributes.length - 1; i >= 0; i--) {
    var attr = attributes[attributes[i]];
    if (inputNode[attributes[i]]) {
      inputNode[attributes[i]] += attr;
    } else {
      inputNode[attributes[i]] = attr;
    }
  }
}

export var addSelect = function(input) {
  var inputNode = addInput(input);

  if (input.attributes && input.attributes.placeholder) {
    var option = document.createElement('option');
    option.selected = true;
    option.disabled = true;
    option.innerHTML = input.attributes.placeholder;
    
    inputNode.appendChild(option);
  }

  if (input.options instanceof Promise) {
    input.options.then(function(data) {
      addOptions(data);
    }, function() {
      // Handle error somehow
    });
  } else {
    addOptions(inputNode, input.options);
  }

  return inputNode;
}

export var addOptions = function(inputNode, options) {
  var inputOptions = Object.keys(options);
  for (var i = inputOptions.length - 1; i >= 0; i--) {
    var option = document.createElement('option');

    option.value = inputOptions[i];
    option.innerHTML = options[inputOptions[i]];

    inputNode.appendChild(option);
  }
}

export var addCheckbox = function(input) {
  var inputNode = document.createElement('div');

  if (input.options instanceof Promise) {
    input.options.then(function(data) {
      addCheckboxes(inputNode, data, input);
    }, function() {
      // Handle error somehow
    });
  } else {
    addCheckboxes(inputNode, input.options, input);
  }

  return inputNode;
}

export var addCheckboxes = function(inputNode, options, input) {
  var inputOptions = Object.keys(options);

  for (var i = inputOptions.length - 1; i >= 0; i--) {
    var label = document.createElement('label');
    label.innerHTML = options[inputOptions[i]];
    console.log(input)
    var checkbox = addInput({
      tag:  'input',
      type: input.type,
      id:   input.id + '_' + i,
      name: input.name,
    })

    console.log(checkbox)

    label.insertBefore(checkbox, label.firstChild);

    inputNode.appendChild(label);
  }
}
