import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from 'lib/Database';
import { IPokemon, Pokemon } from 'models/Pokemon';
import { IUser, User } from 'models/User';
import { applySession } from 'next-session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await applySession(req, res);

    //is user logged in
    if(!req.session.user) {
        res.status(400).json({ error: "You aren't logged in."});
        return res.end();
    }
    
    //connect to database
    await connectToDatabase();

    //does the user already have a question?
    const user: IUser = await User.findOne({ username: req.session.user.username });

    //does user already have a question?
    if(user.expectedAnswer) {
        res.status(400).json({ error: "You already have an active question. "});
        return res.end();
    }

    //get random
    const random = Math.floor(Math.random() * 151); //use document count?

    const pokemon: IPokemon = await Pokemon.findOne({ pokemonId: random });

    const questionId = Math.floor(Math.random() * 4);

    let question = '';

    switch(questionId) {
        case 1:
            question = `What is the pokedex ID of ${pokemon.name}?`;
            await User.updateOne({ expectedAnswer: pokemon.pokemonId}, { username: req.session.user.username });
            break;
        case 2:
            question = `What is the name of the Pokemon with pokedex ID ${pokemon.pokemonId}?`;
            await User.updateOne({ expectedAnswer: pokemon.name}, { username: req.session.user.username });
            break;
        case 3:
            question = `What type or types is ${pokemon.name}?`;
            await User.updateOne({ expectedAnswer: [pokemon.type1, pokemon.type2]}, { username: req.session.user.username });
            break;
        case 4:
            question = `How/at what level does ${pokemon.name} evolve? (enter "none" if they do not evolve)`;
            await User.updateOne({ expectedAnswer: pokemon.evolutionMethod}, { username: req.session.user.username });
            break;
    }

    //get question type

    //what is pokedex id
    //what is name of pokemon with id
    //what type or types is 
    //how does x evolve
    //at what level does x evolve


    res.status(200).json({ question: question });
    return res.end();
}