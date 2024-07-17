const mongoose = require("mongoose");
const { MONGODB_CONNECTION_STRING } = require("../config/index");

let cachedConnection = null;

const dbConnect = async () => {
  try {
    // If a cached connection exists and it's not closed, return it
    if (cachedConnection && cachedConnection.readyState === 1) {
      return cachedConnection;
    }

    mongoose.set("strictQuery", false);

    // Create a new connection if there is no cached connection or the cached connection is closed
    const connection = await mongoose.connect(MONGODB_CONNECTION_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`Database connected to host: ${connection.connection.host}`);

    // Store the new connection in the cache
    cachedConnection = connection;

    // Listen for disconnection events and handle them by removing the cached connection
    connection.connection.on("disconnected", () => {
      console.log("Database disconnected.");
      cachedConnection = null;
    });

    return connection;
  } catch (error) {
    console.error(`Error connecting to the database: ${error}`);
    throw error;
  }
};

module.exports = dbConnect;
