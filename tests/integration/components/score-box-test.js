import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('score-box', 'Integration | Component | score box', {
  integration: true
});

test('it renders', function(assert) {
  this.render(hbs`{{score-box}}`);
  assert.ok(true);
  //assert.equal(this.$().text().trim(), '');
});
