import { mongoose } from "mongoose";
import validator from "validator"

    const userSchema = new mongoose.Schema({
        email:{
            type: String,
            required:true,
            unique: true,
            // validator: [validator.isEmail, 'Invalid email'], can use but for learn use match
            lowercase:true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

        },
        password:{
            type: String,
            required:true,
            unique: true
        }
    }, { timestamps: true })

const User = mongoose.model('User',userSchema);

export default User;