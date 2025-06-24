import mongoose from 'mongoose';

const BlockSchema = new mongoose.Schema({
	timestamp: Number,
	hash: String,
	lastHash: String,
	data: Array, // Här sparas transaktionerna i blocket
});

export default mongoose.model('Block', BlockSchema);
