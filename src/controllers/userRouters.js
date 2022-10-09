const { Router } = require('express');
const { User } = require('../db')

const router = Router()

router.get('/', async (req, res) => {
    const { id } = req.query

    try {
        let data;

        if(id){
            data = await User.findByPk(id)
        }else{
            data = await User.findAll()
        }

        return res.json(data)

    } catch (error) {
        return res.json({err: 'Error al cargar usuarios'})
    }
})


module.exports = router