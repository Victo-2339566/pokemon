import express from 'express';
import pokemonsRouter from './src/routes/pokemons.route.js';
// Créer une application express
const app = express();

// Importer les middlewares
app.use(express.json());

app.use('/api/pokemons',pokemonsRouter)







// Démarrer le serveur
const PORT = process.env.PG_PORT || 5432;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
