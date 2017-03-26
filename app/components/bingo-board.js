import Ember from 'ember';

const { Component, computed, get, inject } = Ember;

export default Component.extend({
  game: inject.service(),
  classNames: ['bingo-board'],
  pickingTarget: null,
  _rows: computed('spaces', function() {
    let spaces = this.get('spaces') || [];
    let rows = [];
    for (let i = 0; i < get(spaces, 'length'); i += 5) {
      rows.push(spaces.slice(i, i + 5));
    }
    return rows;
  }),
  actions: {
    spaceClicked(bingoTargetId) {
      this.set('pickingTarget', bingoTargetId);
    },
    finishSelection(speakerId) {
      this.get('game').makeMove({
        speaker: speakerId,
        target: this.get('pickingTarget')
      });
      this.set('pickingTarget', null);
    }
  }
});
