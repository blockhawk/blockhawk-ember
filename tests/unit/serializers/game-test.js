import { moduleForModel, test } from 'ember-qunit';

moduleForModel('game', 'Unit | Serializer | game', {
  needs: ['serializer:game', 'transform:epoch', 'transform:hex']
});

// Replace this with your real tests.
test('it serializes records', function(assert) {
  let record = this.subject();

  let serializedRecord = record.serialize();

  assert.ok(serializedRecord);
});
