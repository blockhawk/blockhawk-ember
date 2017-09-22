import { moduleFor, test } from 'ember-qunit';

moduleFor('route:demo', 'Unit | Route | demo', {
  needs: ['service:web3']
});

test('it exists', function(assert) {
  let route = this.subject();
  assert.ok(route);
});
