import { Schema, model, models, Document } from 'mongoose';

export interface IUser extends Document {
	username: string,
    password: string,
    correctAnswers: number,
    wrongAnswers: number,
    currentQuestion: string,
    expectedAnswer: string | string[] | number,
}

const userSchema = new Schema<IUser>({
	username: { type: String, required: true },
    password: { type: String, required: true},
    correctAnswers: { type: Number, default: 0 },
    wrongAnswers: { type: Number, default: 0 },
    expectedAnswer: { type: Schema.Types.Mixed },
});

export let User = models['User'] || model('User', userSchema);