const mongoose = require('mongoose');
const config = require('../config/index').config;
const mongo = require('../config/index').mongo;
const debugDB = require('debug')(config.name + ':loaders:mongoose');

let isConnected = false;

async function connectToDatabase() {
    try {
        if (!isConnected) {
            debugDB('Connexion à la base de données ...');
            await mongoose.connect(mongo.DB_URI);
            isConnected = true;
            debugDB('Connexion à la base de données réussie');
        }
    } catch (error) {
        debugDB('Erreur lors de la connexion à la base de données');
        throw error;
    }
}

async function disconnectToDatabase() {
    try {
        if (isConnected) {
            debugDB('Déconnexion de la base de données ...');
            mongoose.disconnect();
            isConnected = false;
            debugDB('Déconnexion de la base de données réussie');
        }
    } catch (error) {
        debugDB('Erreur lors de la déconnexion de la base de données');
        throw error;
    }
}

function connectionStatus() {
    return isConnected;
}

module.exports = {
    connectToDatabase: connectToDatabase,
    disconnectToDatabase: disconnectToDatabase,
    connectionStatus: connectionStatus
}