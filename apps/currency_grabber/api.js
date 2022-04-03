import rp from 'request-promise';
import CONFIG from './config.js';

const sendKursByKey = function(data) {
  let url = CONFIG.BASE_SERVICE_HOST + '/set-kurs-by-key?';
  url += 'key=' + data.key;
  url += '&value=' + data.value;

  rp(url)
    .catch((e) => {
      console.error(e);
    });
}

export default sendKursByKey;