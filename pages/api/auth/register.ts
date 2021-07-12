import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { IUser, User } from 'models/User';
import connectToDatabase from 'lib/Database';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { username, password }: { username: string, password: string } = req.body;

    if(!username) {
        res.status(400).json({ error: "You didn't supply a username." });
        return res.end();
    }
    if(username.length > 20) {
        res.status(400).json({ error: "Your username is too long." });
        return res.end();
    }
    if(!password) {
        res.status(400).json({ error: "You didn't supply a password." });
        return res.end();
    }

    await connectToDatabase();

    //hash password
    const hashedPassword: string = await bcrypt.hash(password, 10);
    //insert user
    const user = new User({ username: username, password: hashedPassword });

    try {
        await user.save();
    }
    catch(error) {
        console.log(error);
    }

    res.status(200);
    res.end();
}