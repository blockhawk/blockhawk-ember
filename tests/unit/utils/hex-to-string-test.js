import hexToString from 'blockhawk-ember/utils/hex-to-string';
import { module, test } from 'qunit';

module('Unit | Utility | hex to string');

test('it works', function(assert) {
  let result = hexToString('0x434849');
  assert.equal(result, 'CHI');
});
