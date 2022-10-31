const { Router } = require('express');
const { Client } = require('../db')


const router = Router()

router.get('/', async (req, res) => {
    const { id } = req.query
    
    try {
        let data;

        if(id){
            
            data = await Client.findByPk(id)
        }else{
            data = await Client.findAll()
        }

        return res.json(data)

    } catch (error) {
        return res.json({err: 'Error al cargar clientes'})
    }

})

router.get('/:id', async(req, res) => {
    const { id } = req.params

    try {
        let data = await Client.findAll({
            where: {userId: id}
        })

        return res.send(data)
    } catch (error) {
        return res.json({err: 'Error al cargar presupuestos'})
    }
})

router.post('/add_client', async (req, res) => {
    let {name, surname, dni, address ,description, phone} = req.body

    if(!name || !surname)return res.status(400).json({error:"Falta enviar datos obligatorios"})

    try {
        
        let client = await Client.create({
            name, 
            surname, 
            dni, 
            address, 
            description, 
            phone
        })

        return res.status(200).send(client)
    } catch (error) {
        return {err: error}
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params
        const client = await Client.findByPk(id)
        if(!client){
            res.status(404).send('No existe el cliente')
        }
        await client.destroy()
        res.send(`El cliente ${id} ha sido eliminada`)
    } catch (error) {
        return {err: error}
    }
})

router.put('/update/:id', async (req, res) => {
    
})


module.exports = router