import ApplicationSerializer from './application';
import hexToString from '../utils/hex-to-string';

export default ApplicationSerializer.extend({
  normalize(_, hash) {
    hash.awayTeam = hexToString(hash.awayTeam);
    hash.homeTeam = hexToString(hash.homeTeam);
    return this._super(...arguments);
  }
});
