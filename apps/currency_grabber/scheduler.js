import alfa from './schedulers/alfa.js';
import currency from './schedulers/currency.js';

class Scheduler{
  constructor(config){
    this.alfa = alfa(config);
    this.currency = currency(config);
  };
}

export default Scheduler;