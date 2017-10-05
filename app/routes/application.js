import Ember from 'ember';

const { $ } = Ember;

export default Ember.Route.extend({
  moment: Ember.inject.service(),
  beforeModel() {
    this.get('moment').setTimeZone('America/New_York');
  },

  model() {
    return $.getJSON('teams.json').then(json => {
      this.get('store').pushPayload(json);
    });
  }
});
