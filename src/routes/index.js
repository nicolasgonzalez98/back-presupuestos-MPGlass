const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const usersRouters = require('../controllers/userRouters')
const authRoutes = require('../controllers/Authentication/index')
const clientsRouters = require('../controllers/clientsRouters')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {
    res.json({msg:'GLASSDOOR'})
})

router.use('/users', usersRouters)
router.use('/auth', authRoutes)
router.use('/clients', clientsRouters)


module.exports = router;
