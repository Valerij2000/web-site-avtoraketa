import {
  postData
} from './modules/post';
import {
  popupSuccess
} from './modules/popup-success';
import {
  dataCallbackForm
} from './modules/data-callback';
import {
  dataRequestForm
} from './modules/data-request';
import './modules/mask';
import {
  popupKorea
} from './modules/popup-korea';

popupKorea();

const formCollback = document.querySelectorAll('.form-callback');
formCollback.forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let message = `<b>Обратный звонок с сайта:</b>\n`;
    message += `<b>Отправитель: </b>${this.name.value}\n`;
    message += `<b>Телефон: </b>${this.tel.value}\n`;
    message += `<b>Сообщение: </b>${this.text.value}\n`;
    postData(dataCallbackForm.URI_API, {
        chat_id: dataCallbackForm.CHAT_ID,
        parse_mode: 'html',
        text: message
      })
      .then((data) => {
        this.tel.value = '';
        this.name.value = '';
        this.text.value = '';
        popupSuccess();
      })
      .catch((err) => {
        console.log(err);
      })
  })
})

if (document.querySelector('.form-request')) {
  const formRequests = document.querySelector('.form-request');
  const selectYear = document.querySelector('.select-year');
  formRequests.addEventListener('submit', function (e) {
    e.preventDefault();
    let [_, num, suffix] = String(this.ionRangeSlider.value.replace(/\;/g, "-")).match(/^(.*?)((?:[,.]\d+)?|)$/);
    let message = `<b>Заявка с сайта на авто:</b>\n`;
    message += `<b>Отправитель: </b>${this.name.value}\n`;
    message += `<b>Телефон: </b>${this.tel.value}\n`;
    message += `<b>Город: </b>${this.city.value}\n`;
    message += `<b>Модель авто: </b>${this.model.value}\n`;
    message += `<b>Год авто: </b>${selectYear.value}\n`;
    message += `<b>Предпочтительная цена ₽: </b>${num.replace(/\B(?=(?:\d{3})*$)/g, ' ')}${suffix}`;
    postData(dataRequestForm.URI_API, {
        chat_id: dataRequestForm.CHAT_ID,
        parse_mode: 'html',
        text: message
      })
      .then((data) => {
        this.name.value = '';
        this.tel.value = '';
        this.city.value = '';
        this.model.value = '';
        selectYear.value = '';
        this.ionRangeSlider.value = '';
        popupSuccess();
      })
      .catch((err) => {
        console.log(err);
      })
  })
}