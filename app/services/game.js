import Ember from 'ember';

const { Service, inject, Logger: { log }, RSVP: { Promise } } = Ember;

export default Service.extend({
  indexdb: inject.service(),
  init() {
    this._super(...arguments);
    this.set('moves', []);
  },
  restoreMoves() {
    return new Promise((resolve) => {
      return this.get('indexdb').allMoves().then((moves) => {
        this.get('moves').setObjects(moves);
        resolve();
      });
    });
  },
  makeMove({speaker, target}) {
    this.get('moves').addObject({speaker, target});
    log(`move made: ${speaker} did ${target}`);
  }
});
