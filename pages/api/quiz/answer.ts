import type { NextApiRequest, NextApiResponse } from 'next';
import connectToDatabase from 'lib/Database';
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

    //does the user have a question?
    const user: IUser = await User.findOne({ username: req.session.user.username });

    if(!user.expectedAnswer) {
        res.status(400).json({ error: "You don't have an active question." });
        return res.end();
    }

    let correct = false;

    //do they have a types question?
    if(Array.isArray(user.expectedAnswer)) {
        const givenTypes = req.body.answer.split(' '); //split the given types
        const correctTypes = user.expectedAnswer.filter(el => el != 'null').map(el => el.toLowerCase()); //lowercase the types removing null

        user.expectedAnswer = correctTypes;
        
        correct = true;
        for(var i=0;i<correctTypes.length;i++) {
            if(!givenTypes.includes(correctTypes[i])) {
                correct = false;
                break;
            }
        }
    }
    else {
        if(user.expectedAnswer.toString().toLowerCase() == req.body.answer.toLowerCase()) {
            correct = true;
        }
    }

    if(correct) {
        user.correctAnswers++;
    }
    else {
        user.wrongAnswers++;
    }

    res.status(200).json({ correct: correct, answer: user.expectedAnswer });

    user.expectedAnswer = null;

    await user.save();

    res.end();
}