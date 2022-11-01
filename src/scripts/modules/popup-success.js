const $ = require("jquery");
import 'bootstrap';

export const popupSuccess = () => {
  $('#call').modal('hide');
  $('#success-request').modal('show');
  setTimeout(() => {
    $('#success-request').modal('hide');
    $('.modal-backdrop').remove();
  }, 2500);
}