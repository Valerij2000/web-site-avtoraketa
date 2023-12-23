const $ = require("jquery");
import 'bootstrap';

const sec = 5;

export const popupKorea = () => {
  setTimeout(() => {
    $('#modal-auto-korea').modal('show');
  }, sec*1000);
}