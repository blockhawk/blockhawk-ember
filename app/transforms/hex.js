import DS from 'ember-data';
import hexToString from '../utils/hex-to-string';

export default DS.Transform.extend({
  deserialize(serialized) {
    return hexToString(serialized);
  },

  serialize(deserialized) {
    return deserialized;
  }
});
