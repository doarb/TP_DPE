
const { text } = require('express');
const mongoDB = require('../loaders/mongoDB');
// Utilisez maintenant l'objet mongoDB pour interagir avec la base de données
test('should Status', () => {
    expect(mongoDB.connectionStatus()).toBe(false);
});

test('should Status', () => {
    expect(mongoDB.connectionStatus()).not.toBe(true);
});

test('should connect to database',  () => {
    mongoDB.connectToDatabase();
    expect(mongoDB.connectionStatus()).toBe(true);
});


test('should disconnect to database', () => {
    mongoDB.disconnectToDatabase();
    expect(mongoDB.connectionStatus()).toBe(false);
});
