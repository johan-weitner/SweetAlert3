import { swalClasses, iconTypes } from './classes.js';

export var defaultParams = {
  title: '',
  text: '',
  html: '',
  type: null,
  customClass: '',
  animation: true,
  allowOutsideClick: true,
  allowEscapeKey: true,
  showConfirmButton: true,
  showCancelButton: false,
  preConfirm: null,
  confirmButtonText: 'OK',
  confirmButtonColor: '#3085d6',
  confirmButtonClass: null,
  cancelButtonText: 'Cancel',
  cancelButtonColor: '#aaa',
  cancelButtonClass: null,
  buttonsStyling: true,
  reverseButtons: false,
  focusCancel: false,
  showCloseButton: false,
  showLoaderOnConfirm: false,
  imageUrl: null,
  imageWidth: null,
  imageHeight: null,
  imageClass: null,
  timer: null,
  width: 500,
  padding: 20,
  background: '#fff',
  input: null, // 'text' | 'email' | 'password' | 'select' | 'radio' | 'checkbox' | 'textarea' | 'file'
  inputPlaceholder: '',
  inputValue: '',
  inputOptions: {},
  inputAutoTrim: true,
  inputClass: null,
  inputAttributes: {},
  inputValidator: null,
  onOpen: null,
  onClose: null,
  inputs: null
};

export var sweetHTML = '<div class="' + swalClasses.overlay + '" tabIndex="-1"></div>' +
  '<div class="' + swalClasses.modal + '" style="display: none" tabIndex="-1">' +
    '<div class="' + swalClasses.icon + ' ' + iconTypes.error + '">' +
      '<span class="x-mark"><span class="line left"></span><span class="line right"></span></span>' +
    '</div>' +
    '<div class="' + swalClasses.icon + ' ' + iconTypes.question + '">?</div>' +
    '<div class="' + swalClasses.icon + ' ' + iconTypes.warning + '">!</div>' +
    '<div class="' + swalClasses.icon + ' ' + iconTypes.info + '">i</div>' +
    '<div class="' + swalClasses.icon + ' ' + iconTypes.success + '">' +
      '<span class="line tip"></span> <span class="line long"></span>' +
      '<div class="placeholder"></div> <div class="fix"></div>' +
    '</div>' +
    '<img class="' + swalClasses.image + '">' +
    '<h2></h2>' +
    '<div class="' + swalClasses.content + '"></div>' +
    '<form></form>' +
    '<div class="' + swalClasses.validationerror + '"></div>' +
    '<hr class="' + swalClasses.spacer + '">' +
    '<button type="button" class="' + swalClasses.confirm + '">OK</button>' +
    '<button type="button" class="' + swalClasses.cancel + '">Cancel</button>' +
    '<span class="' + swalClasses.close + '">&times;</span>' +
  '</div>';
