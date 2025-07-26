import mongoose from "mongoose";

const connectDB = async () => {
    if (mongoose.connections[0].readyState) {
        console.log("MongoDB already connected.");
        return;
    }
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("MongoDB Connected to Atlas!");
    } catch (err) {
        console.error("Error connecting to MongoDB Atlas:", err.message);
        throw err;
    }
};

const productSchema = new mongoose.Schema({
    productName: { 
        type: String, required: true, unique: true
    },
    imageURL: { 
        type: String, required: true, unique: true 
    },
    price: { 
        type: Number, required: true 
    },
    description: { 
        type: String, required: true
    }
});

const collection=new mongoose.model("Data", productSchema);

export { connectDB, collection };
