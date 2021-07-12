import * as mongoose from 'mongoose';

async function connectToDatabase() {
    if(mongoose.connections[0].readyState) {
        return;
    }
    
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    }
    catch(error) {
        console.error(error);
    }
}

export default connectToDatabase;