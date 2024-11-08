const fs = require('fs')

// Read Files
// fs.readFile('./docs/blog1.txt', (err, data) => {
//     if(err){
//         console.log(err)
//     }
//     console.log(data.toString())
// })
// console.log('last line')

// Write files
// fs.writeFile('./docs/blog1.txt', 'Hello World', () => {
//     console.log("file was written")
// })
//make directories
if(!fs.existsSync('./assest')){
    fs.mkdir('./assest', (err) => {
        if(err){
            console.log(err)
        }   
        console.log('File created')
    })
}
else{
    fs.rmdir('./assest', (err) => {
        if(err){
            console.log(err)
        }   
        console.log('File Deleted')
    })
}

if(fs.existsSync('./docs/deleteme.txt')) {
    fs.unlink('./docs/deleteme.txt', (err) =>{
        if(err){
            console.log(err)
        }
        console.log('file deleted')
    })
}