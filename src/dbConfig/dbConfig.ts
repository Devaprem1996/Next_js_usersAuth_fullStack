
import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect(process.env.MONGO_URL!);
        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log('mongoDB connected successfully');   
        })
        
        connection.on("error", (err) => {
            console.log("MongoDB connection error, please make sure MongoDB is running." + err)
            process.exit();
        })  
    } catch (error) {
        console.log("Something went wrong!");
        console.log(error);
        
    }
}