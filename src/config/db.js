const mongoose = require('mongoose');

const connect = async () => {
    const name = process.env.DB_NAME;

    if(!name) {
        throw Error('Database name must be specified.');
    }

    const port = process.env.DB_PORT || 27017;
    const host = process.env.DB_HOST || 'localhost';
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;

    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }

    if(username && password) {
        options = {
            username,
            pass,
            ...options
        }
    }
    
    await mongoose.connect(`mongodb://${host}:${port}/${name}`, options);
};

const disconnect = async () => {
    await mongoose.connection.close();
};

module.exports = {
    connect,
    disconnect,
};
