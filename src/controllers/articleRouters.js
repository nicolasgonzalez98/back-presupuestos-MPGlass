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

router.get('/:id', async(req, res) => {
    const { id } = req.params

    try {
        let data = await Article.findAll({
            where: {userId: id}
        })

        return res.send(data)
    } catch (error) {
        return res.json({err: 'Error al cargar articulos'})
    }
})

router.post('/add_article', async (req, res) => {
    try {
        let {name, weight_price, area_price, unity_price ,type, unity, userId} = req.body

        console.log(req.body)
        if(!name)return res.status(404).send('Faltan enviar datos obligatorios')
        if(!weight_price)weight_price = 0
        if(!area_price)area_price = 0
        if(!unity_price)unity_price = 0
        if(weight_price)weight_price = parseInt(weight_price)
        if(area_price)area_price = parseInt(area_price)
        if(unity_price)unity_price = parseInt(unity_price)
        
        let article = await Article.create({
            name, 
            weight_price, 
            area_price, 
            unity_price,
            type, 
            unity,
            userId
        })

        

        return res.status(200).send(article)

    } catch (error) {
        console.log(error)
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

router.put('/edit_article/:id', async(req, res) => {
    const { id } = req.params
    let { weight_price, area_price, unity_price, type, unity } = req.body
    let condition = {}
    try {
        let article = await Article.findByPk(id)
        if(weight_price)condition.weight_price = weight_price
        if(area_price)condition.area_price = area_price
        if(unity_price)condition.unity_price = unity_price
        if(type)condition.type = type
        if(unity)condition.unity = unity

        await article.update(condition)
        return res.send(article)

    } catch (error) {
        return res.send(error)
    }
})

module.exports = router