const { Router } = require('express')
const { User } = require('../../db')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt');

const router = Router();

function isAuthenticated(req, res, next) {
    //console.log(req, ' esto es req.session register isAuthenticated');
    //console.log(req.user, ' esto es req.user register isAuthenticated');
    //console.log(req.cookies,' esto es req.cookies register isAuthenticated' )
    //console.log(req.signedCookies,' esto es req.signedCookies register isAuthenticated' )
    if (req.isAuthenticated()) {
        res.send('/authentication/register');
    } else {
        next();
    }
    
}

//-------------------------------------------------------------------------------
// Esta ruta get responde cuando un usuario con sesión activa intenta
// hacer un post a /api/service/register.
//-------------------------------------------------------------------------------

router.get('/register', (req, res, next) => {
    res.send("No podes registrar una nueva cuenta mientras estas logueado.");
})

router.post('/register', async(req, res) => {

    const { user, email, password} = req.body;

    if(!user || !email || !password)return res.send('Faltan datos obligatorios')

    try {
        let security_jumps = 8 //Saltos de seguridad
        let new_user;

        const findUser = User.findOne({where: {[Op.or]: [{ username: user }, { email: email }]}})
        const hashPassword = bcrypt.hash(password, security_jumps)

        const promise_pending_array =await Promise.all([findUser, hashPassword])

        if(!promise_pending_array[0]){
            let create = {
                username: user, 
                email: email
            }
            create.password = promise_pending_array[1]
            
            
            new_user = await User.create(create)
            
            return res.send('Cuenta creada correctamente.')
        }else{
            return res.send('Ya fue creada una cuenta con este usuario o email.');
        }

    } catch (error) {
        
        return res.status(404).send({error:error})
    }
})


module.exports = router;