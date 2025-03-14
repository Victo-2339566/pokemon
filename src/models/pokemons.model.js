import db from '../config/db_pg.js';

// requette pour chercher un pokemon selon son ID 
const getPokemon = async (id) => {
    try {
      const requete = `SELECT nom, type_primaire, type_secondaire, pv, attaque, defense FROM pokemon WHERE id = $1`;
      const params = [id];
  
      const resultat = await db.query(requete, params); // `await` pour attendre le résultat
      return resultat.rows; // Retourner les lignes de la requête
    } catch (erreur) {
      console.error(`Erreur SQL: ${erreur.message}`);
      throw erreur;
    }
  };
  
const getPokemonType=(type)=>{
    return new Promise ((resolve,reject)=>{
        const requette =`SELECT nom,type_primaire,type_secondaire,pv,attaque,defense FROM pokemon WHERE  type_primaire= $1`;
        const params =[type];
        db.query(requette,params,(erreur,resultat)=>{
            if(erreur){
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });

};
const getPokemonListe=()=>{
    return new Promise ((resolve,reject)=>{
        const requette =`SELECT nom,type_primaire,type_secondaire,pv,attaque,defense FROM pokemon`;
        db.query(requette,(erreur,resultat)=>{
            if(erreur){
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
};
const addPokemons=(pokemon)=>{
    return new Promise ((resolve,reject)=>{
        const requette =`INSERT INTO pokemon (nom,type_primaire,type_secondaire,pv,attaque,defense) VALUES (?,?,?,?,?,?)`;
        const params =[pokemon.nom,pokemon.type_primaire,pokemon.type_secondaire,pokemon.pv,pokemon.attaque,pokemon.defense];
        db.query(requette,params,(erreur,resultat)=>{
            if(erreur){
                console.log(`Erreur sqlState ${erreur.sqlState} : ${erreur.sqlMessage}`);
                reject(erreur);
            }
            resolve(resultat.rows);
        });
    });
};

export default {getPokemon,getPokemonType,getPokemonListe,addPokemons};