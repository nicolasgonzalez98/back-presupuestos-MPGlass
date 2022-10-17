const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

const usersRouters = require('../controllers/userRouters')
const authRoutes = require('../controllers/Authentication/index')
const clientsRouters = require('../controllers/clientsRouters')
const articleRouters = require('../controllers/articleRouters')
const budgetRouters = require('../controllers/budgetRouters')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/', (req, res) => {
    res.json({msg:'GLASSDOOR'})
})

router.use('/users', usersRouters)
router.use('/auth', authRoutes)
router.use('/clients', clientsRouters)
router.use('/articles', articleRouters)
router.use('/budgets', budgetRouters)


module.exports = router;
