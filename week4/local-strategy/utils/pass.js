const passport = require('passport')
const Strategy = require('passport-local').Strategy

const users = [
    {
        user_id: 1,
        name: 'Foo Bar',
        email: 'foo@bar.fi',
        password: 'foobar'
    },
    {
        user_id: 2,
        name: 'Bar Foo',
        email: 'bar@foo.fi',
        password: 'barfoo'
    }
]

const getUser = (id) => {
    const user = users.filter(user => user.user_id === id)
    return user[0]
}

const getUserLogin = (email, pass) => {
    const user = users.filter(user => user.email === email && user.password === pass)
    return user[0]
}

passport.serializeUser((id, done) => {
    console.log('serialize', id)
    done(null, id)
})

passport.deserializeUser((id, done) => {
    console.log('deserializeid: ', id)
    const user = getUser(id.user_id)
    console.log('deserialize', user)
    done(null, user)
})

passport.use(new Strategy(
    (email, password, done) => {
        const user = getUserLogin(email, password)
        if (typeof user === 'undefined') {
            return done(null, false)
        } else {
            return done(null, user)
        }
    }
))

module.exports = passport