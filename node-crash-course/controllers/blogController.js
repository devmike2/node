const Blog = require('../Models/blogs')
// blog_ibdex, blog_details, blog_create_get, blog_create_post, blog_delete

//========= error handling ===============
const handleError = (err) =>{
    console.log(err.message)
    let errors = {title:'', snippet:'', body:''}

    if(err.message.includes('blog validation failed:')){
        Object.values(err.message).forEach(({properties}) =>{
            errors[properties.path] = properties.message
        })
    }

    return errors
}

const blog_index = (req, res) =>{
    Blog.find().sort({ createdAt: -1})
    .then((result) =>{
        res.render('blogs/index', {title: 'All Blogs', blogs: result })
    })
    .catch((err) =>{
        console.log(err)
    })
}

const blog_details = (req, res) =>{
    const id  = req.params.id
    Blog.findById(id)
    .then((result) =>{
        res.render('blogs/details', { blog: result, title: 'Blog Details' })
    })
    .catch((err) =>{
        console.log(err)
    })
}

const blog_create_get = (req, res) =>{
    res.render('blogs/create', {title: 'Create blogs'})
}


const blog_create_post = (req, res) => {
    const blog = new Blog( req.body)
    try{    
        blog.save()
        .then((result) =>{
            res.status(201).json(result)
        })
    } catch(err) {
        const errors = handleError(err)
        res.status(400).json({errors})
    }
}

const blog_delete = (req, res) =>{
    const id = req.params.id
    Blog.findByIdAndDelete(id)
    .then((result) =>{
       res.json({redirect: '/blogs'})
    })
    .catch((err) =>{
        console.log(err)
    })
}

module.exports = {
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}