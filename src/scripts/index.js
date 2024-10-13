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
import {
  dataCreditForm,
  TOKEN
} from './modules/data-creditform';
import './modules/mask';
import {
  popupKorea
} from './modules/popup-korea';

popupKorea();

if (document.querySelector('.form-callback')) {
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
}

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

if (document.querySelector('.form-credit')) {
  const formCredit = document.querySelector('.form-credit');
  formCredit.addEventListener('submit', function (e) {
    e.preventDefault();

    let message = `<b>Заявка на кредит:</b>\n`;
    message += `<b>Заявитель: </b>${this.credit_name.value}\n`;
    message += `<b>Телефон: </b>${this.credit_tel.value}\n`;
    message += `<b>Образование: </b>${this.credit_education.value}\n`;
    message += `<b>Семейное положение: </b>${this.credit_status.value}\n`;
    message += `<b>Город проживания: </b>${this.credit_city.value}\n`;
    message += `<b>Фактическое место жительства совпадает с местом регистрации: </b>${this.credit_living.value}\n`;
    message += `<b>Место работы: </b>${this.credit_working_place.value}\n`;
    message += `<b>Адрес работы: </b>${this.credit_working_address.value}\n`;
    message += `<b>Должность: </b>${this.credit_occupation.value}\n`;
    message += `<b>Стаж: </b>${this.credit_working_experience.value}\n`;
    message += `<b>Доход, сумма ₽: </b>${this.credit_income.value}\n`;
    message += `<b>Дополнительный доход ₽: </b>${this.credit_additional_income.value}\n`;
    message += `<b>Персона для ЭС: </b>${this.credit_additional_person.value}\n`;
    message += `<b>Рабочий номер или номер руководителя: </b>${this.credit_additional_number.value}\n`;
    message += `<b>Марка модель машины: </b>${this.credit_car_model.value}\n`;
    message += `<b>Стоимость авто ₽: </b>${this.credit_car_cost.value}\n`;
    message += `<b>Сумма первого взноса ₽: </b>${this.credit_first_summ.value}`;

    const fileInput = document.querySelector('#credit_passport');
    const files = fileInput.files;

    if (files.length > 0) {
      const promises = [];
      const chatId = dataCreditForm.CHAT_ID;
      const botToken = TOKEN;

      for (const file of files) {
        const formData = new FormData();
        formData.append('chat_id', chatId);
        formData.append('photo', file);

        // Send each file to Telegram
        const promise = fetch(`https://api.telegram.org/bot${botToken}/sendPhoto`, {
          method: 'POST',
          body: formData,
        }).then(response => response.json());

        promises.push(promise);
      }

      Promise.all(promises)
        .then(results => {
          console.log('Success:', results);
        })
        .catch((error) => {
          console.error('Error:', error);
          alert('Ошибка отправки файла...');
        });
    }

    postData(dataCreditForm.URI_API, {
        chat_id: dataCreditForm.CHAT_ID,
        parse_mode: 'html',
        text: message
      })
      .then((data) => {
        document.querySelectorAll('.form-credit input').forEach(function (el) {
          el.value = '';
        })
        popupSuccess();
      })
      .catch((err) => {
        console.log(err);
      })
  })
}