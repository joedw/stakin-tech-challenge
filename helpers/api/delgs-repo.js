const fs = require('fs');

// delgs in JSON file for simplicity, store in a db for production applications
let delgs = require('data/delgs.json');

export const delgsRepo = {
    getAll: () => delgs,
    getById: id => delgs.find(x => x.id.toString() === id.toString()),
    find: x => delgs.find(x),
    create,
    update,
    delete: _delete
};

function create(delg) {
    // generate new delg id
    delg.id = delgs.length ? Math.max(...delgs.map(x => x.id)) + 1 : 1;

    // set date created and updated
    delg.dateCreated = new Date().toISOString();
    delg.dateUpdated = new Date().toISOString();

    // add and save delg
    delgs.push(delg);
    saveData();
}

function update(id, params) {
    const delg = delgs.find(x => x.id.toString() === id.toString());

    // set date updated
    delg.dateUpdated = new Date().toISOString();

    // update and save
    Object.assign(delg, params);
    saveData();
}

// prefixed with underscore '_' because 'delete' is a reserved word in javascript
function _delete(id) {
    // filter out deleted delg and save
    delgs = delgs.filter(x => x.id.toString() !== id.toString());
    saveData();
    
}

// private helper functions

function saveData() {
    fs.writeFileSync('data/delgs.json', JSON.stringify(delgs, null, 4));
}