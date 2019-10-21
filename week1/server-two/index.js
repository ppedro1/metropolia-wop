const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.use(express.static('public'))
app.get('/', (request, response) => {
    response.render('index')
})

app.get('/catinfo', (request, response) => {
    const cat = {
        'name': 'Mörkö',
        'age': 13,
        'weight': 6
    }

    response.json(cat)
})

app.listen(port, () => console.log(`listening on port ${ port }`))
