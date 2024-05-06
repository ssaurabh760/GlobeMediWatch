import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();

//signing tokens 
export const createToken = (_id) => {
    if (typeof _id !== 'string') {
        _id = _id.toString(); // Convert _id to string if it's not already
    }
    //using _id as in mongoDB user id
    //passing id, jwt secret, expiresTime
   return jwt.sign({ _id, }, process.env.JWT_SECRET, { expiresIn: '30m' });
}

