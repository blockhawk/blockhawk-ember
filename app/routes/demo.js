import Ember from 'ember';

const { $, RSVP } = Ember;

export default Ember.Route.extend({
  web3: Ember.inject.service(),

  beforeModel() {
    if (document.readyState === 'complete') {
      return new RSVP.Promise((resolve, reject) => {
        this.checkNetwork(resolve, reject);
      });
    } else {
      return new RSVP.Promise((resolve, reject) => {
        window.addEventListener('load', () => {
          this.checkNetwork(resolve, reject);
        });
      });
    }
  },

  checkNetwork(resolve, reject) {
    return this.get('web3').network().then(network => {
      if (network !== 'ropsten') {
        reject(new Error('Please switch to the Ropsten Test Network on MetaMask and refresh the page.'));
      } else {
        resolve();
      }
    });
  },

  model() {
    const web3 = this.get('web3');
    const contract = $.getJSON('contracts/NFLWeek.json').then(json => {
      return web3.contract(json.abi, '0x4687f401aA791b93983EF30905658Fca93Cb8503');
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
