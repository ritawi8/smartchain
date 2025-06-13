import { app } from './app.mjs';

let PORT = process.env.PORT || 3000;

// Om du kör med npm run dev-node, generera en slumpad port
if (process.env.GENERATE_NODE_PORT === 'true') {
	PORT = 3000 + Math.floor(Math.random() * 1000); // t.ex. 3000-3999
}

app.listen(PORT, () => {
	console.log(`Servern körs på port ${PORT}`);
});
