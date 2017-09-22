import Ember from 'ember';
import web3 from 'npm:web3';

export default Ember.Service.extend({
  _instance: null,

  init() {
    if (typeof window.web3 !== 'undefined') {
      this._instance = new Web3(window.web3.currentProvider);
    } else {
      // do my fallback here
    }
  }
});
