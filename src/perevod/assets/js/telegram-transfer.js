const TOKEN = '6364348155:AAEF_J3DFaX88T_EUdf4k-iPrEXsCtDMw8c';

const dataFormPerevod = {
  CHAT_ID: '-1001987939821',
  URI_API: `https://api.telegram.org/bot${TOKEN}/sendMessage`
}

const formPerevod = document.querySelector('#form-perevod');

async function postData(url = '', data = {}) {
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  return response.json(); // parses JSON response into native JavaScript objects
}

formPerevod.addEventListener('submit', function (e) {
  e.preventDefault();
  let message = `<b>Заявка на перевод:</b>\n`;
  message += `<b>Отправитель: </b>${this.name.value}\n`;
  message += `<b>Телефон: </b>${this.tel.value}\n`;
  message += `<b>Сумма перевода: </b>${this.sum.value}$\n`;
  postData(dataFormPerevod.URI_API, {
      chat_id: dataFormPerevod.CHAT_ID,
      parse_mode: 'html',
      text: message
    })
    .then((data) => {
      this.tel.value = '';
      this.name.value = '';
      this.sum.value = '';
      $("#modal-form").modal("hide");
      $("#modal-thanks").modal("show");
      setTimeout(() => {
        $("#modal-thanks").modal("hide");
      }, 5000);
    })
    .catch((err) => {
      console.log(err);
    })
})