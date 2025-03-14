import express from 'express';
import modelPokemon from '../models/pokemons.model.js';

const afficherPokemon = (req,res)=>{
    if(!req.params.id){
        res.status(400); 
        res.send({
            message: "L'ID du Pokemon est obligatoire"
        });
        return;
    }
    modelPokemon.getPokemon(req.params.id)
    .then((pokemon)=>{
        if(!pokemon[0]){
            res.status(404);
            res.send({
                message: `Pokemon introuvable avec l'id ${req.params.id}`
            });
            return;
        }
        res.send(pokemon);
    })
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Echec lors de la récupération du pokemon avec l'id " + req.params.id
        });
    });
};
const afficherPokemonListeType = (req,res)=>{
    const page = parseInt(req.query.page) || 1; // Par défaut, la page 1
    console.log(page);
    console.log(req.query.type);
    console.log(req.query.page);
    const limit = 25;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    if(!req.query.type){
        modelPokemon.getPokemonListe()
        .then((pokemon)=>{
            const pokemonPagines = pokemon.slice(startIndex, endIndex);
        res.status(200);
        res.send(pokemonPagines);} )
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Echec lors de la récupération des pokemons"});
        });
    };
    if(req.query.type){
        modelPokemon.getPokemonType(req.query.type)
        .then((pokemon)=>{
            // Paginer les résultats avec slice()
            const pokemonPagines = pokemon.slice(startIndex, endIndex);
            res.status(200);
            res.send(pokemonPagines);
        })
        .catch((erreur) => {
            console.log('Erreur : ', erreur);
            res.status(500)
            res.send({
                message: "Echec lors de la récupération des pokemons"});
        });
    };

}
const ajouterPokemon = (req,res)=>{
    if(!req.body.nom || !req.body.type_primaire || !req.body.type_secondaire || !req.body.pv || !req.body.attaque || !req.body.defense){
        res.status(400);
        res.send({
            message: "Tous les champs sont obligatoires"
        });
        return;
    }
    modelPokemon.addPokemons(req.body)
    .then((pokemon)=>{
        res.status(201);
        res.send({message : "Le pokemon a été ajouté avec succès"});
    })
    .catch((erreur) => {
        console.log('Erreur : ', erreur);
        res.status(500)
        res.send({
            message: "Echec lors de l'ajout du pokemon"
        });
    });
}
export default {afficherPokemon,afficherPokemonListeType,ajouterPokemon};