const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const blogRoutes = require('./routes/blogRoutes')
const authRouter = require('./routes/authRouter')


//=============== create an express app =======

const app = express()

// connect to mongoDb(DATABASE) and listening  for request

const dbURI = 'mongodb+srv://devmike:dmuserp@nodetut.6rxmg.mongodb.net/node-tuts'
mongoose.connect(dbURI)
.then(resulut =>{
    app.listen(3500);
    console.log('Connected to Db')
    console.log('Listening to request on port 3500')
    
})
.catch((err) => console.log(err))


app.set('view engine', 'ejs')

//=========== midleware and static file=========

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
//=========== custom middleware =============
app.use(morgan('dev'))

// ================ landing url =================
app.get('/', (req, res) =>{
    res.redirect('/blogs')
})

// ================ About url =================
app.get('/about', (req, res) =>{
    
    res.render('about', { title: 'About'})
})
// ========= authentication & authurization ============


app.use(authRouter)


//================= BLOGS ROUTES ===============
app.use('/blogs' ,blogRoutes)

// ================ 404 url =================
app.use((req, res) =>{
    res.status(404).render('404', { title: '404'})
})
