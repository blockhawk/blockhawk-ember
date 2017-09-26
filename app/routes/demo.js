import Ember from 'ember';

const { $, RSVP } = Ember;

export default Ember.Route.extend({
  web3: Ember.inject.service(),

  beforeModel() {
    if (document.readyState !== 'complete') {
      return new RSVP.Promise(resolve => window.addEventListener('load', resolve));
    }
  },

  /*model() {
    const web3 = this.get('web3');
    const teamContract = this.contractJSON('NFLTeams').then(json => {
      return web3.contract(json.abi, '0xe321c46de2e62deba0cb3a8a254e9229eb25123d');
    });

    const teamCount = teamContract.then(contract => {
      return this.call(contract, 'teamCount');
    });

    const abbrs = teamContract.then(contract => {
      return this.call(contract, 'abbrs', 0);
    });

    return RSVP.hash({
      teamContract: teamContract,
      teamCount: teamCount,
      abbrs: abbrs
    });
  },*/

  contractJSON(contractName) {
    return $.getJSON(`contracts/${contractName}.json`);
  },

  call(contract, functionName, ...params) {
    return new RSVP.Promise((resolve, reject) => {
      contract[functionName](...params, (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result);
        }
      });
    });
  }
});
