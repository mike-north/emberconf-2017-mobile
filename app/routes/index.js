import Ember from 'ember';

const { Route, inject } = Ember;

export default Route.extend({
  game: inject.service(),
  model() {
    return {
      bingotargets: this.store.peekAll('bingotarget'),
      speakers: this.store.peekAll('speaker')
    };
  },
  afterModel() {
    return this.get('game').restoreMoves();
  }
});
