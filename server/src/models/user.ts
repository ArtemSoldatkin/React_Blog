import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { User } from '../types/user';

const userSchema = new mongoose.Schema({
    login: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    avatar: String,
});

userSchema.plugin(uniqueValidator);
interface UserModel extends User, mongoose.Document {}
export default mongoose.model<UserModel>('User', userSchema);
