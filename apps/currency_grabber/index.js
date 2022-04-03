/* Entry point for app
 * Init all parts of application
 */

import Scheduler from './scheduler.js';
import CONFIG from './config.js';

CONFIG.IS_PROD = process.env.NODE_ENV === 'prod';

const scheduler = new Scheduler(CONFIG);

// const app = express();

// app.listen('8070', () => {
//   console.log('started at 8070 is prod: ' + IS_PROD);
// });

// app.get('/', (req, res) => {
//   res.send('sadlas;dlaks;dlaskd;laskd 8070 is prod: ' + IS_PROD);

//   console.log('request is prod: ' + IS_PROD);
// });
