import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

export default DS.Model.extend({
  city: DS.attr('string'),
  nickname: DS.attr('string'),

  imageUrl: computed('city', 'nickname', function() {
    const city = this.get('city').replace(' ', '');
    const nickname = this.get('nickname');
    return `https://static-hosted.stats.com/GZ/images/NFLlogos/${city}${nickname}.png`;
  })
});
