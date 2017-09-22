import Ember from 'ember';

const { RSVP } = Ember;

export default Ember.Route.extend({
  web3: Ember.inject.service(),

  beforeModel() {
    return new RSVP.Promise(resolve => {
      window.addEventListener('load', () => {
        // Force web3 init
        this.get('web3');
        resolve();
      });
    });
  }
});
