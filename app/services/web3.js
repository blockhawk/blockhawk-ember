import Ember from 'ember';
import Web3 from 'npm:web3';

export default Ember.Service.extend({
  _instance: null,
  metaMaskDetected: false,

  init() {
    if (typeof window.web3 !== 'undefined') {
      this._instance = new Web3(window.web3.currentProvider);
      this.metaMaskDetected = true;
    } else {
      this._instance = new Web3('https://ropsten.infura.io/HeH7PrbtiUWHvxTaskzn');
    }
  },

  contract(abi, address) {
    return new this._instance.eth.Contract(abi, address);
  },

  network() {
    return this._instance.eth.net.getNetworkType();
  }
});
