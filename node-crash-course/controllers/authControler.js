const User = require('../Models/User')
const jwt = require('jsonwebtoken')

const handleError = (err) =>{
    console.log(err.message, err.code)
    let errors = { credential: '',email:'', password:'' }

    //============ login erreors ==============
    if(err.message === 'incorrect email'){
        errors.credential = 'Invalid credentials'
    }
    if(err.message === 'incorrect password'){
        errors.credential = 'Invalid credentials'
    }

    if(err.code === 11000){
        errors = 'Email is already registered'
    }

    if(err.message.includes('user validation failed:')){
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message
        });
    }

    return errors
}
const maxAge = 3 * 24 * 60 * 60
const createToken = (id) => {
    return jwt.sign({ id }, 'unique user', {
        expiresIn: maxAge
    })
}

module.exports.signup_get = (req, res) =>{
    res.render('auth/signup', {title: 'Sign up'})
}

module.exports.login_get = (req, res) =>{
    res.render('auth/login', {title: "login"})
}
module.exports.signup_post = async (req, res) =>{
    const { firstname, lastname, email, password } = req.body 

    try {
        const user = await User.create({ firstname, lastname, email, password})
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge : maxAge * 1000
        })
        res.status(201).json({user: user._id})

    } catch (err) {
        const error = handleError(err)
        res.status(400).json({ error })
    } 
}
module.exports.login_post = async (req, res) =>{
    const { email, password } = req.body
    console.log(req.body)
    try {
        const user = await User.login(email, password)
        const token = createToken(user._id)
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge : maxAge * 1000
        })
        res.status(201).json({user: user._id})
    } catch (err) {
        const errors = handleError(err)
        res.status(400).json({ errors })
    }
}