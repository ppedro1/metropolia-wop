'use strict';
const express = require('express');
const session = require('express-session')
const passport = require('./utils/pass')
const app = express();
const port = 3000;

const loggedIn = (req, res, next) => {
	if (req.user) {
		next()
	} else {
		res.redirect('/login')
	}
}

const username = 'foo';
const password = 'bar';

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(session({ secret: 'asdjflsagjasdguaosdölkedrfghjäpösodjygsdjgökjsdjröelwkrjfsdklhlögjsdfasd' }))

app.use(passport.initialize())
app.use(passport.session())

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

app.post('/login', passport.authenticate('local', { failureRedirect: '/form' }), (req, res) => {
	res.redirect('/secret')
})

app.get('/logout', (req, res) => {
	req.logout()
	res.redirect('/')
})

app.get('/secret', loggedIn, (req, res) => {
	res.render('secret')
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
