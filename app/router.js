import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  didTransition() {
    this._super(...arguments);
    const trackingId = (config.environment === 'development') ? 'UA-106990108-2' : 'UA-106990108-1';
    gtag('config', trackingId, {page_path: this.get('url')});
  }
});

Router.map(function() {
  this.route('demo');
});

export default Router;
