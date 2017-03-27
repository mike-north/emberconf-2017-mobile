import Ember from 'ember';

const { Component, computed, get, inject } = Ember;

export default Component.extend({
  game: inject.service(),
  indexdb: inject.service(),
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
      let target = this.get('pickingTarget');
      this.get('game').makeMove({
        speaker: speakerId,
        target
      });
      this.set('pickingTarget', null);
      this.get('indexdb').saveMove(target, speakerId);
    }
  }
});
