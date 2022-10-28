const { Router } = require('express');
const { Budget, Article } = require('../db')


const router = Router()

router.get('/', async (req, res) => {
    const { id } = req.query

    try {
        let data;

        if(id){
            
            data = await Budget.findByPk(id)
        }else{
            data = await Budget.findAll({
                include: 'list_budget'
            })
        }

        return res.json(data)
    } catch (error) {
        return res.json({err: error})
    }
})

router.post('/add_budget', async (req, res) => {
    let { iva, userId, clientId, articles } = req.body

    try {
        let budget = await Budget.create({
            iva,
            userId,
            clientId
        })

        

        articles.map(e => {
            
        })

        return res.status(200).send(budget)
    } catch (error) {
        res.send(error)
    }
})

router.post('/delete_budget/:id', async(req, res) => {
    let { id } = req.params

    try {
        const budget = await Budget.findByPk(id)
        
        if(!budget){
            res.status(404).send('No existe el articulo')
        }

        await budget.destroy()

        res.send(`El presupuesto ${id} ha sido eliminada`)

    } catch (error) {
        return res.json({err: error})
    }
})

module.exports = router