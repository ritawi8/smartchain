import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.MONGO_URL);
		console.log('✅ Ansluten till MongoDB!');
	} catch (err) {
		console.error('❌ Fel vid anslutning till MongoDB:', err);
		process.exit(1);
	}
};
