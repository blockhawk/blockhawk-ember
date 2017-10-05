import DS from 'ember-data';

export default DS.Model.extend({
  awayTeam: DS.belongsTo('team'),
  awayTeamScore: DS.attr('number'),
  homeTeam: DS.belongsTo('team'),
  homeTeamScore: DS.attr('number'),
  spread: DS.attr('number'),
  startTime: DS.attr('epoch'),
  state: DS.attr('number'),
  week: DS.attr('number')
});
