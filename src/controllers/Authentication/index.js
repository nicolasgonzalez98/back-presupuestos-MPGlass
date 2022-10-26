const router = require('express').Router();

//Controllers
const registerRoutes = require('./registerRoutes')
const logInRoutes = require('./logInRoutes')
const logOutRoutes = require('./logOutRouters')

//URLS

router.use('/', registerRoutes)
router.use('/', logInRoutes)
router.use('/', logOutRoutes)

router.get('/', async (req, res) => {
    try {
        res.status(200).send("Ruta api/service")
    } catch (error) {
        res.status(error.status).json({error: error.message})
    }
});

module.exports = router