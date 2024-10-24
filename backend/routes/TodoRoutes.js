const express = require('express')
const router = express.Router()

const Task = require('../model/TodoModel')


router.post('/add', async (req, res) => {
    const { name, age } = req.body

    try {

        const task = new Task({ name, age })
        const data = await task.save()

        res.status(200).json({ message: 'Todo list Added', data })

    } catch (error) {
        res.status(400).json({ message: 'Todo list nod Added' })
    }
})


router.get('/get', async (req, res) => {
    try {

        const data = await Task.find()

        res.status(200).json({ message: "Todo list get successfully", data })

    } catch (error) {
        res.status(400).json({ message: 'Todo list nod get', error })
    }
})

router.put('/update/:id', async (req, res) => {
    const { id } = req.params
    const { name, age } = req.body

    try {

        const data = await Task.findByIdAndUpdate(
            id,
            { name, age }
        )

        if (!data) {
            res.status(404).json({ message: "Todo list not found" })
        }
        res.status(200).json({ message: "Todo list updated" })

    } catch (error) {
        res.status(400).json({ message: "Todo list not updated" })
    }
})

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params

    try {
        
        const data = await Task.findByIdAndDelete(id)

        res.status(200).json({message: "Todo list deleted successfully"})

    } catch (error) {
        res.status(400).json({ message: "Todo list not deleted" })

    }
})


module.exports = router