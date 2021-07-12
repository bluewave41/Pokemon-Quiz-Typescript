import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import { IUser, User } from 'models/User';
import connectToDatabase from 'lib/Database';
import { applySession } from 'next-session';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await applySession(req, res);

    const { username, password }: { username: string, password: string } = req.body;

    if(!username) {
        res.status(400).json({ error: "You didn't supply a username." });
        return res.end();
    }
    if(!password) {
        res.status(400).json({ error: "You didn't supply a password." });
        return res.end();
    }

    await connectToDatabase();

    const user: IUser = await User.findOne({ username: username }).exec();

    if(!user) {
        res.status(400).json({ error: "Your username or password are incorrect." });
        return res.end();
    }

    const comparison = await bcrypt.compare(password, user.password);

    if(comparison) {
        req.session.user = { username: username }
        res.status(200);
    }
    else {
        res.status(400).json({ error: "Your username or password are incorrect." });
    }

    res.end();
}