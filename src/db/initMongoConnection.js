import mongoose from "mongoose";
import { getEnvVar } from "../utils/getEnvVar.js";

export async function initMongoConnection() {
  try {
    const user = getEnvVar("MONGODB_USER");
    const password = getEnvVar("MONGODB_PASSWORD");
    const url = getEnvVar("MONGODB_URL");
    const db = getEnvVar("MONGODB_DB");

    const uri = `mongodb+srv://${user}:${password}@${url}/${db}?retryWrites=true&w=majority&appName=Cluster0`;


    mongoose.set("bufferCommands", false);
    mongoose.set("strictQuery", true);

    console.log("Connecting to MongoDB...");
    await mongoose.connect(uri, { maxPoolSize: 10 });


    await mongoose.connection.db.command({ ping: 1 });
    console.log("MongoDB connected successfully to:", mongoose.connection.name);


    const collections = await mongoose.connection.db.listCollections().toArray();
    console.log("Collections in DB:", collections.map(c => c.name));


    const count = await mongoose.connection.db.collection("products").countDocuments();
    console.log("Total products found in collection:", count);
  } catch (e) {
    console.error("Error while setting up mongo connection:", e);
    process.exit(1);
  }
}
