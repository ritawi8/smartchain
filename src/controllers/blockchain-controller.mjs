import { blockChain } from '../server.mjs';
import BlockModel from '../models/BlockModel.mjs';

export const listAllBlocks = (req, res) => {
	res.status(200).json({ success: true, data: blockChain.chain });
};

export const addBlock = (req, res) => {
	const { data } = req.body;
	blockChain.addBlock({ data });
	res
		.status(201)
		.json({ success: true, message: 'Block is added', data: blockChain.chain });
};

export const getBlocks = async (req, res) => {
	const blocks = await BlockModel.find();
	res.json({ blocks });
};

export const mineTransactions = async (req, res) => {
	try {
		// ... din kod för att skapa block ...
		const newBlock = blockChain.addBlock(blockData);
		await BlockModel.create({
			timestamp: newBlock.timestamp,
			hash: newBlock.hash,
			lastHash: newBlock.lastHash,
			data: newBlock.data,
		});
		res.json({ message: 'Block sparat!', block: newBlock });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: 'Fel vid mining/block-sparande' });
	}
};
