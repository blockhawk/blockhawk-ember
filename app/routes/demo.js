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
      return web3.contract(json.abi, '0x3f12d8184ad248cc2d1143bd698765ad800799db');
    });

    const store = this.get('store');
    const games = contract.then(contract => {
      return contract.methods.gamesCount().call().then(gamesCount => {
        let promises = [];
        for (let i = 0; i < gamesCount; i++) {
          const gamePromise = contract.methods.games(i).call().then(game => {
            game.id = i;
            store.pushPayload('game', {game: game});
            return store.peekRecord('game', i);
          });
          promises.push(gamePromise);
        }
        return RSVP.all(promises);
      });
    });

    return games;
  }
});
