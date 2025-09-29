const $ = require("jquery");
import 'bootstrap';

const sec1 = 60;
const sec2 = 10;

const autoPopupInit = () => {
  setTimeout(() => {
    $('#info').modal('show');
  }, sec2*1000);
}

autoPopupInit();