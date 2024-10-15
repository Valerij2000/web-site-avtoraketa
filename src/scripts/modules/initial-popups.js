const $ = require("jquery");
import 'bootstrap';

const sec1 = 60;
const sec2 = 10;

const popupKorea = () => {
  setTimeout(() => {
    $('#modal-auto-korea').modal('show');
  }, sec1*1000);
}

const popupCredit = () => {
  setTimeout(() => {
    $('#modal-credit').modal('show');
  }, sec2*1000);
}

popupCredit();

popupKorea();