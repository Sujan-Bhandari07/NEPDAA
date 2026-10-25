import mongoose from 'mongoose';
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGOS;
        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in environment variables.');
        }
        await mongoose.connect(mongoURI, {
            dbName: "Adda-n"
        });
        console.log('MongoDB Connected...');
    }
    catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};
export { connectDB };
//# sourceMappingURL=db.js.map