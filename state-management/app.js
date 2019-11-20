'use strict';
const express = require('express');
const session = require('express-session')
const cookieParser = require('cookie-parser')
const app = express();
const port = 3000;
const username = 'foo';
const password = 'bar';

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({ secret: 'asdjflsagjasdguaosdölkedrfghjäpösodjygsdjgökjsdjröelwkrjfsdklhlögjsdfasd' }))
app.set('views', './views');
app.set('view engine', 'pug');

app.get('/', (req, res) => {
	res.render('home')
});

app.get('/setCookie/:color', (req, res) => {
	res.cookie('color', req.params.color).send(`set color cookie to ${req.params.color}`)
})

app.get('/deleteCookie', (req, res) => {
	res.clearCookie('color').send('dem cookies are deleted')
})

app.get('/form', (req, res) => {
	res.render('form')
})

app.post('/login', (req, res) => {
	console.log(req.body)
	if (req.body.password === password && req.body.username === username) {
		req.session.logged = true
		res.redirect('/secret')
	} else {
		req.session.logged = false
		res.redirect('/form')
	}
})

app.get('/secret', (req, res) => {
	if (req.session.logged) {
		res.render('secret')
	} else {
		res.redirect('/form')
	}
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
