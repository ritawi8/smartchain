import { blockChain } from '../server.mjs';

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
