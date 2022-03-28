const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let client;

// Connect to DB
module.exports.connect = async () => {
    client = await MongoMemoryServer.create();
    const uri = client.getUri();
    const mongooseOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };
    mongoose.connect(uri, mongooseOptions);
};

// Disconnect and delete data
module.exports.close = async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await client.stop();
};
