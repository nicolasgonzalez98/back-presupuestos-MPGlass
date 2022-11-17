const { Router } = require('express');

const { Budget, Article, BudgetArticle } = require('../db')


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

router.get('/:id', async(req, res) => {
    const { id } = req.params

    try {
        let data = await Budget.findAll({
            where: {userId: id}
        })

        return res.send(data)
    } catch (error) {
        return res.json({err: 'Error al cargar presupuestos'})
    }
})

router.get('/client/:id', async(req, res) => {
    const { id } = req.params

    try {
        let data = await Budget.findAll({
            where: {clientId: id}
        })

        return res.send(data)
    } catch (error) {
        return res.json({err: 'Error al cargar presupuestos'})
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

        

        const pending_promises_array = articles.map(e => Article.findOrCreate({
            where: {name: e.name, },
            defaults: {
                userId: userId
            }
        }))

        await Promise.all(pending_promises_array)

        let nombres = articles.map(e => e.name)
        let articlesDb = await Article.findAll({
            where:{name:nombres}
        })

        console.log(budget.id)

        await budget.addList_budget(articlesDb)

        let articlesBudgetDb = await BudgetArticle.findAll({
            where: {budget_id: budget.id}
        })

        for(let i = 0; i<articlesBudgetDb.length; i++){
            articlesBudgetDb[i].quantity = articles[i].quantity
            articlesBudgetDb[i].weight = articles[i].weight
            articlesBudgetDb[i].width = articles[i].width   
            articlesBudgetDb[i].height = articles[i].height 
            articlesBudgetDb[i].price = articles[i].price
            await articlesBudgetDb[i].save()
        }

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