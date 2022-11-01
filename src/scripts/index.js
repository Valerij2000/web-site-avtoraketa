import { postData } from './modules/post';
import './modules/mask';
import { popupSuccess } from './modules/popup-success';

const TOKEN = '5624677904:AAHYck4wJnxmvzJlVyGkrP3Nb-22iLu8hms';
const CHAT_ID = '-1001851943548';
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;
const formCollback = document.querySelectorAll('.form-callback');

formCollback.forEach(form => {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    let message = `<b>Заявка с сайта:</b>\n`;
    message += `<b>Отправитель: </b>${this.name.value}\n`;
    message += `<b>Телефон: </b>${this.tel.value}\n`;
    message += `<b>Сообщение: </b>${this.text.value}\n`;
    postData(URI_API, {
        chat_id: CHAT_ID,
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