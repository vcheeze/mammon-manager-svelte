import PouchDB from 'pouchdb-browser';
import RelationalPouch from 'relational-pouch';
import PouchDBFind from 'pouchdb-find';

// PouchDB plugins
PouchDB.plugin(RelationalPouch);
PouchDB.plugin(PouchDBFind);

let db = new PouchDB('db');
db.setSchema([
  {
    singular: 'budget',
    plural: 'budgets',
    relations: {
      budgetItems: { hasMany: 'budgetItem' }
    }
  },
  {
    singular: 'budgetItem',
    plural: 'budgetItems',
    relations: {
      budget: { belongsTo: 'budget' },
      category: { belongsTo: 'category' },
      transactions: { hasMany: 'transaction' }
    }
  },
  {
    singular: 'transaction',
    plural: 'transactions',
    relations: {
      budgetItem: { belongsTo: 'budgetItem' },
      category: { belongsTo: 'category' },
      tags: { hasMany: 'tag' }
    }
  },
  {
    singular: 'category',
    plural: 'categories',
    relations: {
      budgetItems: { hasMany: 'budgetItem' },
      transactions: { hasMany: 'transaction' }
    }
  },
  {
    singular: 'tag',
    plural: 'tags',
    relations: {
      transactions: { hasMany: 'transaction' }
    }
  }
]);
let remoteDB = new PouchDB('http://localhost:5984/db');
db.replicate.to(remoteDB).on('complete', function() {
  console.log('DB replicate complete!');
}).on('error', function(err) {
  console.error(err);
});

export default db;