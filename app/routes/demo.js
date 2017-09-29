import Ember from 'ember';

const { $, RSVP } = Ember;

export default Ember.Route.extend({
  web3: Ember.inject.service(),

  beforeModel() {
    if (document.readyState !== 'complete') {
      return new RSVP.Promise(resolve => window.addEventListener('load', resolve));
    }
  },

  model() {
    const web3 = this.get('web3');
    const contract = $.getJSON('contracts/NFLWeek.json').then(json => {
      return web3.contract(json.abi, '0x0325f3ec4a276ce26f134022ccc026afdb3d522f');
    });

    const games = contract.then(contract => {
      return contract.methods.gamesCount().call().then(gamesCount => {
        let promises = [];
        for (let i = 0; i < gamesCount; i++) {
          promises.push(contract.methods.games(i).call());
        }
        return RSVP.all(promises);
      });
    });

    return games;
  }
});
