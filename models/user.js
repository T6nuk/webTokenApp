const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {Schema} = mongoose;

const { isEmail } = require('validator') //isEmail osa koodipaketist..emaili valideerimiseks

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email.'], //kui ei täideta, annab sõnumi please enter...
        unique: true,
        validate: [isEmail, 'Please enter a valid email.'] //pakett kontrollib läbi isEmail ja kui ei ole õige, siis Please enter...
    },
    password: {
        type: String,
        required: [true, 'Please enter a password.'],
        minlength: [6, 'Minimum length of characters must not be below 6.'],
    }
});
//function for password before saving to DB (salt, encrypt);
userSchema.pre('save', async function(next) {    //enne salvestamiset hashi andmed...async paneb ülejäänud koodi pausile.
    console.log('a user is about to be saved', this);
    console.log(this);
    const salt = await bcrypt.genSalt(); //ootame, ja genereerime salti
    this.password = await bcrypt.hash(this.password, salt); //ühendab parooli saltiga, parooli saame this(user)mudelist.
    next(); //teeb koodi läbi ja läheb järgmisele reale
});

userSchema.statics.userLogin = async function(email, password) { //async peame ootama
    const user = await this.findOne({ email }); //otsime emaili
    if(user) { //kui leiab kasutaja
        const pswMatch = await bcrypt.compare(password, user.password) //user passwordi võrdleme sisestatud parooliga (hashitud);
        if(pswMatch) {
            console.log(user);
            return user;
        } 
        throw Error('invalid password');
    }
    throw Error('invalid email');
};

const User = mongoose.model('User', userSchema);
module.exports = User;

