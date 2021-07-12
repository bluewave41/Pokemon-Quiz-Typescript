import { Schema, model, models } from 'mongoose';

export interface IUser {
	username: string,
    password: string,
    correctAnswers: number,
    wrongAnswers: number,
    expectedAnswer: string | string[],
}

const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
    password: { type: String, required: true},
    correctAnswers: { type: Number, default: 0 },
    wrongAnswers: { type: Number, defaut: 0 },
    expectedAnswer: { type: Schema.Types.Mixed },
});

export let User = models['User'] || model('User', userSchema);