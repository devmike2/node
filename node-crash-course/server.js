const http = require('http')
const fs = require('fs')
const _ = require('lodash')

const server = http.createServer((req, res) =>{
    console.log('Request made')
    
    //Lodash
    const num =_.random(0,20)
    console.log(num)


    res.setHeader('content.type', 'text/html')

    let path = './views/'
    switch (req.url) {
        case '/':
            path += 'index.html'
            req.satatusCode = 200
        break;
        case '/about':
            path += 'about.html'
            res.satatusCode = 200
        break
        case '/about-me':
            res.statusCode = 301
            res.setHeader('Location', '/about')
            res.end()
        break
        case '/login':
            path += 'login.html'
            res.satatusCode = 200
        break
        default:
            path += '404.html' 
            res.satatusCode = 404
        break;
    }

    fs.readFile(path, (err, data) => {
        if(err){
            console.log(err)
            res.end()
        }
        else{
            res.write(data)
            res.end()
        }
    })
})

server.listen(3000, 'localhost', () =>{
    console.log('Listening to request on port 3000')
})