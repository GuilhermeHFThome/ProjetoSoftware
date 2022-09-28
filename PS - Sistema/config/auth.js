const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/CadastroUser')

 

module.exports = function (passport) {
 
    passport.serializeUser(function(user, done) {
        done(null, {
           id      : user.id
       });
      });
 
    passport.deserializeUser(async (id, done) => {
        try {
            const db = require('../models/db');
            const user = await User.findAll({where : {'id':id}})
            done(null, user);
        } catch (err) {
            done(err, null);
        }
    });
 
    passport.use(new LocalStrategy({
        usernameField: 'login',
        passwordField: 'password'
    },
        async (login, password, done) => {
            try {
                const User = require('../models/CadastroUser')
                const user = await User.findAll({where : {'login':login}})
 
                // usuário inexistente
                if (!user) { return done(null, false) }
 
                // comparando as senhas

                
                const hashedPassword = await bcrypt.hash(password,10);
                const isValid = bcrypt.compareSync(password, hashedPassword);
                console.log(isValid)
                
                if (!isValid) return done(null, false)
                
                return done(null, user)
            } catch (err) {
                done(err, false);
            }
        }
    ));
}