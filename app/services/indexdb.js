import Ember from 'ember';

const { Service, RSVP: { Promise } } = Ember;

export default Service.extend({
  _dbName: 'BingoDB',
  _dbVersion: 1,
  _storeName: 'BingoStore',
  saveMove(target, speaker) {
    return this._dbOperation(({objectStore}) => {
      objectStore.add({target, speaker});
    });
  },
  allMoves() {
    let x = null;
    return this._dbOperation(({objectStore}) => {
      x = objectStore.getAll();
    }).then(() => {
      return x.result || [];
    });
  },
  _dbOperation(cb) {
    return new Promise((resolve, reject) => {
      let open = indexedDB.open(this.get('_dbName'), this.get('_dbVersion'));

      open.onsuccess = (event) => {
        let db = event.target.result;
        let transaction = db.transaction([this.get('_storeName')], "readwrite");

        var objectStore = transaction.objectStore(this.get('_storeName'));
        
        cb({db, transaction, objectStore});
        
        transaction.oncomplete = function(event) {
          resolve(event);
        };
        transaction.onerror = function(event) {
          reject(event);
        };
      };
    });
  }
});
