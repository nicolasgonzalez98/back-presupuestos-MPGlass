const { Router } = require("express");
var passport = require("passport");
const router = Router()

router.post('/login', 
    passport.authenticate("local", { 
        failureRedirect: "/authentication/login" 
    }), 
    async (req, res) => {
        try {
            
            let { id, username, email} = req.user;

            return res.json({log_in: true, id:id, username: username, email:email})
        } catch (error) {
            res.status(404).send('Error')
        }
    } 
)


router.get('/login', (req, res)=> {
    console.log('Hubo un error.')
    return res.send('Email o contraseña invalida');
})

router.get('/in', (req, res) => {
    return res.send('Ya estas registrado!')
})

module.exports = router