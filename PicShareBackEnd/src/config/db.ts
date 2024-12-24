import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb+srv://diptaranjan123:zgMGLq0H5YCgYuol@cluster0.ipznw.mongodb.net/');  

        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error:any) {
        console.error(`Error: ${error.message}`);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;
//zgMGLq0H5YCgYuol