const app = require('./src/config/app');
const mongodb = require('./src/config/db');

(async function () {
    try {
        // Connect to database
        await mongodb.connect()

        const port = process.env.PORT || 3000;
        await app.listen(port);
        console.log(`Listening on port ${port}`);
    } catch(error) {
        console.log(error);
    }
}())