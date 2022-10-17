const { Router } = require('express');
const { Article } = require('../db')


const router = Router()

router.get('/', async (req, res) => {
    const { id } = req.query
    
    try {
        let data;

        if(id){
            
            data = await Article.findByPk(id)
        }else{
            data = await Article.findAll()
        }

        return res.json(data)

    } catch (error) {
        return res.json({err: 'Error al cargar articulos'})
    }
})

router.post('/add_article', async (req, res) => {
    try {
        let {name, quantity, weight, width ,height, price} = req.body
        if(!name)return res.status(404).send('Faltan enviar datos obligatorios')
        
        let article = await Article.create({
            name, 
            quantity, 
            weight, 
            width, 
            height, 
            price
        })

        return res.status(200).send(article)

    } catch (error) {
        return res.json({err: error})
    }
})

router.delete('/delete_article/:id', async(req, res) => {
    try {
        const { id } = req.params
        const article = await Article.findByPk(id)
        if(!article){
            res.status(404).send('No existe el articulo')
        }
        await article.destroy()
        res.send(`El articulo ${id} ha sido eliminada`)
    } catch (error) {
        return {err: error}
    }
})
module.exports = router