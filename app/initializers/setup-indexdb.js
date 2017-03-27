import Ember from 'ember';

const { RSVP } = Ember;

function setupOrUpgradeStorage() {
  return new RSVP.Promise((resolve, reject) => {
    // Open (or create) the database
    let open = indexedDB.open('BingoDB', 1);
    
    open.onupgradeneeded = (evt) => {
      let db = open.result;
      let store = null;
      switch (evt.oldVersion) {
        case 0: // Upgrade from 0
          store = db.createObjectStore("BingoStore", { keyPath: "target" });
          store.createIndex("speaker", "speaker", { unique: false });
      }
    }

    open.onerror = (err) => {
      reject(err);
    }

    open.onsuccess = () => { 
      resolve();
    }
  });
}

export function initialize(application) {
  if (typeof FastBoot === 'undefined' && indexedDB) {
    application.deferReadiness();
    setupOrUpgradeStorage().finally(() => {
      application.advanceReadiness();
    });
  }
}

export default {
  name: 'setup-indexdb',
  initialize
};

