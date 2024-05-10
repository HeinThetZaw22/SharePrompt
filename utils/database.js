import mongoose from "mongoose";
let isConnected = false;

export const connectDatabase = async () => {
    mongoose.set('strictQuery', true);
    if(isConnected){
        console.log("MongoDb have already connected");
        return;
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        isConnected =  true;
        console.log("Mongodb connected");
    } catch (error) {
        console.log(error);
    }
}